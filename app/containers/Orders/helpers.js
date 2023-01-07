import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { PDFDocument } from "pdf-lib";
import { get } from "lodash";
import JsBarcode from "jsbarcode";

// Filters
export const getStoreFilter = (stores = []) => {
  return stores.map(({ _id, name }) => ({
    value: _id,
    label: name,
  }));
};

export const getPaymentFilter = () => {
  return [
    {
      value: "COD",
      label: "COD",
    },
    {
      value: "Prepaid",
      label: "Prepaid",
    },
  ];
};

export const getCarrierStatusFiler = () => {
  return [
    {
      value: "AWB Generated",
      label: "AWB Generated",
    },
    { value: "APPROVED", label: "Approved" },
    { value: "Shipment cancelled", label: "Shipment cancelled" },
  ];
};

function textToBase64Barcode(text) {
  var canvas = document.createElement("canvas");
  JsBarcode(canvas, text, { format: "CODE39" });
  return canvas.toDataURL("image/png");
}

let headerfooterDoc = {
  // header: {
  //   margin: [0, 0, 0, 0],
  //   alignment: "center",
  //   height: 100,
  //   width: 600,
  // },
  content: [],
  pageSize: {
    height: 768,
    width: 384,
  },
  styles: {
    header: {
      fontSize: 20,
      bold: true,
      alignment: "center",
      // margin: [0, 30, 0, 20],
    },
    subheader: {
      fontSize: 15,
      bold: true,
      // margin: [0, 15, 0, 10],
      // color: "#003893",
    },
    details: {
      fontSize: 9,
      bold: true,
      margin: [0, 0, 0, 0],
      color: "#000",
    },
    text: {
      alignment: "justify",
    },
    link: {
      decoration: "underline",
      color: "#0074c1",
    },
  },

  //   content: content,
  pageMargins: [0, 70, 0, 0],
};

const getBillDocDefinition = ({
  shopifyOrderName = "N/A",
  invoiceDetails,
  storeId,
  shippingAddress,
  shippingAddressString,
  weight,
  paymentMode,
}) => {
  const dataTable = {
    widths: ["*", "*", "*", "*"],
    heights: [50, 50],
    body: [
      [
        {
          image: require("assets/img/brand/areen-logo.png"),
          fit: [200, 100],
          alignment: "center",
          bold: true,
          rowSpan: 2,
          colSpan: 2,
        },
        {},
        {
          text: `Order Id: ${shopifyOrderName}`,
          alignment: "center",
          bold: true,
          colSpan: 2,
          style: "subheader",
        },
        {},
      ],
      [
        {},
        {},
        {
          text: `Invoice Id: ${get(invoiceDetails, "orderNo", "N/A")}`,
          alignment: "center",
          bold: true,
          colSpan: 2,
          style: "subheader",
        },
      ],
      [
        {
          text: `Website: ${get(storeId, "name", "N/A")}`,
          margin: [0, 10, 0, 10],
          alignment: "center",
          bold: true,
          colSpan: 4,
          style: "header",
        },
      ],
      [
        {
          text: "Shipped From",
          style: "subheader",
          margin: [15, 0, 0, 0],
          bold: true,
          colSpan: 4,
          border: [true, true, true, false],
        },
      ],
      [
        {
          text:
            "\n AREEN EAST AND WEST \n17th Street, umm Ramool, \nDubai, United Arab Emirates, \nPhone: +97142678888, \nEmail: ecommerce@areenew.ae \n ",
          margin: [15, 0, 0, 0],
          bold: true,
          colSpan: 4,
          border: [true, false, true, true],
        },
      ],
      [
        {
          text: get(shippingAddress, "city", "N/A"),
          margin: [0, 10, 0, 10],
          bold: true,
          colSpan: 4,
          style: "header",
        },
      ],
      [
        {
          text: "Delivered To",
          style: "subheader",
          margin: [15, 0, 0, 0],
          bold: true,
          colSpan: 4,
          border: [true, true, true, false],
        },
      ],
      [
        {
          text: shippingAddressString,
          margin: [15, 0, 0, 0],
          bold: true,
          colSpan: 4,
          border: [true, false, true, true],
        },
      ],
      [
        {
          text: "Weight",
          alignment: "center",
          // fillColor: "#D9D9D9",
          bold: true,
          border: [true, true, true, false],
        },

        {
          text: "Payment Mode",
          alignment: "center",
          // fillColor: "#D9D9D9",
          bold: true,
          colSpan: 2,
          border: [true, true, true, false],
        },
        {},
        {
          text: "Amount",
          alignment: "center",
          // fillColor: "#D9D9D9",
          bold: true,
          border: [true, true, true, false],
        },
      ],
      [
        {
          text: `${weight} KG`,
          alignment: "center",
          // fillColor: "#D9D9D9",
          bold: true,
          border: [true, false, true, true],
          style: "header",
        },

        {
          text: paymentMode,
          alignment: "center",
          // fillColor: "#D9D9D9",
          bold: true,
          colSpan: 2,
          border: [true, false, true, true],
          style: "header",
        },
        {},
        {
          text: paymentMode === "COD" ? "600" : "N/A",
          alignment: "center",
          // fillColor: "#D9D9D9",
          bold: true,
          border: [true, false, true, true],
          style: "header",
        },
      ],
      [
        {
          image: textToBase64Barcode(get(invoiceDetails, "orderNo", "0")),
          alignment: "center",
          height: 100,
          bold: true,
          colSpan: 4,
        },
      ],
    ],
  };
  return {
    ...headerfooterDoc,
    content: [
      {
        table: dataTable,
      },
    ],
  };
};

export const generateAreenShippingBills = async (
  orders = [],
  generateAreenShipment
) => {
  const mergedPdf = await PDFDocument.create();
  for (let order of orders) {
    const pdfDocGenerator = pdfMake.createPdf(getBillDocDefinition(order));
    pdfDocGenerator.getBuffer(async ({ buffer }) => {
      const currentBill = await PDFDocument.load(buffer, {
        ignoreEncryption: true,
      });
      const copiedPages = await mergedPdf.copyPages(
        currentBill,
        currentBill.getPageIndices()
      );
      copiedPages.forEach((page) => mergedPdf.addPage(page));
      const finalFile = await mergedPdf.save();
      download(finalFile, "shipping-bill.pdf", "application/pdf");
    });
  }

  generateAreenShipment(orders.map((order) => order._id).join(","));
};

function download(file, filename, type) {
  // const link = document.getElementById("link");
  // link.download = filename;
  let binaryData = [];
  binaryData.push(file);
  window.open(
    URL.createObjectURL(new Blob(binaryData, { type: type })),
    "_blank"
  );
}
