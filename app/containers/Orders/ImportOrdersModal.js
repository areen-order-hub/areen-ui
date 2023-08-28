import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  Col,
} from "reactstrap";
import { useDropzone } from "react-dropzone";
import { isEmpty, groupBy, map, get, round } from "lodash";
import moment from "moment-timezone";
import * as XLSX from "xlsx/xlsx.mjs";
import * as operations from "./actions";

export default function ImportOrdersModal({ isOpen, toggle }) {
  const dispatch = useDispatch();

  const shapeAndImportOrders = () => {
    const formattedOrders = map(
      Object.entries(importedOrders),
      ([shopifyOrderName, value]) => {
        let finalOrder = { shopifyOrderName, isBulkOrder: true };
        let shopifyOrderItems = {};

        value.forEach((order) => {
          finalOrder["customerName"] = get(order, "customerName", "N/A");
          finalOrder["shopifyOrderDate"] = moment(
            get(order, "shopifyOrderDate"),
            "DD-MM-YYYY"
          ).valueOf();
          finalOrder["weight"] = get(order, "weight", 0.5);
          finalOrder["bulkStoreAlias"] = get(order, "storeAlias", "");
          finalOrder["bulkStoreName"] = get(order, "storeName", "");
          finalOrder["billingAddress"] = {
            name: get(order, "billingAddress.name", "N/A"),
            address1: get(order, "billingAddress.address1", "N/A"),
            address2: get(order, "billingAddress.address2", "N/A"),
            city: get(order, "billingAddress.city", "N/A"),
            province: get(order, "billingAddress.province", "N/A"),
            country: get(order, "billingAddress.country", "N/A"),
            phone: get(order, "billingAddress.phone", "N/A"),
            zip: get(order, "billingAddress.zip", "N/A"),
          };
          finalOrder["shippingAddress"] = {
            name: get(order, "shippingAddress.name", "N/A"),
            address1: get(order, "shippingAddress.address1", "N/A"),
            address2: get(order, "shippingAddress.address2", "N/A"),
            city: get(order, "shippingAddress.city", "N/A"),
            province: get(order, "shippingAddress.province", "N/A"),
            country: get(order, "shippingAddress.country", "N/A"),
            phone: get(order, "shippingAddress.phone", "N/A"),
            zip: get(order, "shippingAddress.zip", "N/A"),
            latitude: get(order, "shippingAddress.latitude", "N/A"),
            longitude: get(order, "shippingAddress.longitude", "N/A"),
          };
          finalOrder["shippingAddressString"] = `\n ${get(
            order,
            "shippingAddress.name",
            ""
          )}, \n${get(order, "shippingAddress.address1", "")} ${get(
            order,
            "shippingAddress.address2",
            ""
          )}, \n${get(order, "shippingAddress.city", "")} - ${get(
            order,
            "shippingAddress.zip",
            ""
          )}, \n${get(order, "shippingAddress.province", "")}, ${get(
            order,
            "shippingAddress.country",
            ""
          )}, \nPhone: ${get(order, "shippingAddress.phone", "")} \n `;

          finalOrder["shopifyPrice"] = get(order, "shopifyPrice", "0");
          finalOrder["paymentMode"] =
            get(order, "paymentMode", "cod").toLowerCase() === "cod"
              ? "COD"
              : "Prepaid";

          shopifyOrderItems[`${get(order, "itemSKU", "")}`.trim()] = {
            quantity: get(order, "itemQuantity", "0"),
            title: get(order, "itemTitle", "N/A"),
            price: round(get(order, "itemPrice", 0), 2),
          };
        });

        finalOrder["shopifyOrderItems"] = shopifyOrderItems;
        return finalOrder;
      }
    );

    dispatch(operations.saveBulkOrders(formattedOrders));
    toggle();
    setAcceptedFiles([]);
  };

  const [importedOrders, setImportedOrders] = useState({});
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const accept =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel";

  const onDrop = useCallback(
    (accepted) => {
      setAcceptedFiles([...accepted]);
      accepted.forEach((file) => {
        const reader = new FileReader();

        reader.onload = function(e) {
          const data = e.target.result;
          const workbook = XLSX.read(data, {
            type: "binary",
            cellDates: true,
          });

          workbook.SheetNames.forEach(function(sheetName) {
            const XL_row_object = XLSX.utils.sheet_to_row_object_array(
              workbook.Sheets[sheetName]
            );
            const rows = JSON.parse(JSON.stringify(XL_row_object));
            setImportedOrders(groupBy(rows, "shopifyOrderName"));
          });
        };
        reader.readAsBinaryString(file);
      });
    },
    [acceptedFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: false,
  });

  let acceptedFileItems =
    acceptedFiles != undefined
      ? acceptedFiles.map((file, i) => <a key={file.path}>{file.path} </a>)
      : [];

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      size="xl"
      fullscreen
      backdrop="static"
    >
      <ModalHeader toggle={toggle}>Import Orders</ModalHeader>
      <ModalBody>
        <Label for="exampleSelect" className="font-weight-bold">
          Upload the filled Excel Sheet
        </Label>
        <p for="exampleSelect">
          Please ensure all the details are correct and each item in the order
          is added to a separate row.
        </p>
        <Col>
          <div
            {...getRootProps({ className: "dropzone" })}
            className="dz-drag-hover dz-preview-img  dz-message dropzone"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the file here ...</p>
            ) : (
              <p>Drag and drop your file here, or click to select file.</p>
            )}
          </div>
        </Col>
        <Label for="exampleSelect" className="font-weight-bold ml-4" sm={12}>
          {acceptedFiles.length > 0 && <>Uploaded File - {acceptedFileItems}</>}
        </Label>
      </ModalBody>
      <ModalFooter>
        <Button
          disabled={isEmpty(acceptedFiles)}
          color="primary"
          onClick={() => shapeAndImportOrders()}
        >
          Import
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            toggle();
            setAcceptedFiles([]);
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
