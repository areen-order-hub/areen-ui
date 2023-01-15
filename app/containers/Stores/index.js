/**
 *
 * Stores
 *
 */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col, Button, Table, Badge } from "reactstrap";
import AlertPopupHandler from "components/AlertPopup/AlertPopupHandler";
import PaginationDetails from "components/PaginationDetails";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import history from "../../utils/history";
import * as operations from "./actions";
import * as selectors from "./selectors";
import "./storesStyle.scss";

export default function Stores() {
  useInjectReducer({ key: "stores", reducer });
  const dispatch = useDispatch();
  const { isLoading, stores, paginationDetails } = useSelector((state) => ({
    isLoading: selectors.isLoading(state),
    stores: selectors.stores(state),
    paginationDetails: selectors.paginationDetails(state),
  }));

  useEffect(() => {
    dispatch(operations.fetchStores({ page: 1 }));
  }, []);

  const onStoreStatusChange = (id, isActive) => {
    AlertPopupHandler.open({
      onConfirm: () =>
        dispatch(
          operations.updateStoreStatus(
            id,
            {
              isActive,
            },
            { page: paginationDetails.page }
          )
        ),
      confirmBtnText: isActive ? "Activate" : "Deactivate",
      text: `You are about to ${
        isActive ? "activate" : "deactivate"
      } this store. Do you want to continue?`,
      data: {},
      customClass: "text-xs",
      btnSize: "sm",
      ...(isActive
        ? {
            success: true,
            confirmBtnBsStyle: "success",
            cancelBtnBsStyle: "outline-sucess",
          }
        : { warning: true }),
    });
  };

  const getStoreData = () =>
    stores.map(({ _id, name, alias, isActive }) => (
      <React.Fragment key={_id}>
        <tr>
          <td className="hover-pointer text-primary">{name}</td>
          <td>
            <Badge>{alias}</Badge>
          </td>
          <td>
            <Button
              title="Edit Store"
              type="button"
              color="primary"
              size="sm"
              onClick={() => history.push(`/store-form?id=${id}`)}
            >
              <span className="btn-inner--icon">
                <i className="fas fa-edit" />
              </span>
            </Button>
            {isActive ? (
              <Button
                title="Deactivate Store"
                type="button"
                color="danger"
                size="sm"
                onClick={() => onStoreStatusChange(_id, false)}
              >
                <span className="btn-inner--icon">
                  <i className="fas fa-ban" />
                </span>
              </Button>
            ) : (
              <Button
                title="Activate Store"
                type="button"
                color="success"
                size="sm"
                onClick={() => onStoreStatusChange(_id, true)}
              >
                <span className="btn-inner--icon">
                  <i className="fas fa-sign-in-alt" />
                </span>
              </Button>
            )}
          </td>
        </tr>
      </React.Fragment>
    ));

  return (
    <div className="stores  mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Stores</title>
        <meta name="description" content="Description of Stores" />
      </Helmet>
      <Row className="mt-3">
        <div className="align-items-right ml-auto mr-3 mr-md-5">
          <Button
            disabled
            color="primary"
            className="btn-icon btn-3"
            type="button"
            onClick={() => history.push("/store-form")}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-plus" />
            </span>
            <span className="btn-inner--text">Add Store</span>
          </Button>
        </div>
      </Row>
      <div className="table-responsive">
        <Table className="mt-3 align-items-center">
          <thead className="thead-light">
            <tr>
              <th scope="col">Store Name</th>
              <th scope="col">Alias</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{getStoreData()}</tbody>
        </Table>
      </div>
      <Row>
        <Col className="text-end ms-auto">
          <PaginationDetails
            paginationDetails={paginationDetails}
            onClick={(page) => {
              dispatch(operations.fetchStores({ page }));
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

Stores.propTypes = {};
