/**
 *
 * Users
 *
 */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col, Button, Badge } from "reactstrap";
import AlertPopupHandler from "components/AlertPopup/AlertPopupHandler";
import PaginationDetails from "components/PaginationDetails";
import Table from "components/Table";
import Can from "components/Can";
import {
  USER_MODULE,
  CREATE_ACTION,
  UPDATE_ACTION,
} from "../../utils/constants";
import { useAccess } from "utils/permissions";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import history from "../../utils/history";
import * as operations from "./actions";
import * as selectors from "./selectors";
import "./usersStyle.scss";

export default function Users() {
  useInjectReducer({ key: "users", reducer });
  const dispatch = useDispatch();
  const { isLoading, users, paginationDetails } = useSelector((state) => ({
    isLoading: selectors.isLoading(state),
    users: selectors.users(state),
    paginationDetails: selectors.paginationDetails(state),
  }));

  useEffect(() => {
    dispatch(operations.fetchUsers({ page: 1 }));
  }, []);

  const onUserStatusChange = (id, isEnabled) => {
    AlertPopupHandler.open({
      onConfirm: () =>
        dispatch(
          operations.updateUserStatus(
            id,
            {
              isEnabled,
            },
            { page: paginationDetails.page }
          )
        ),
      confirmBtnText: isEnabled ? "Activate" : "Deactivate",
      text: `You are about to ${
        isEnabled ? "activate" : "deactivate"
      } this user. Do you want to continue?`,
      data: {},
      customClass: "text-xs",
      btnSize: "sm",
      ...(isEnabled
        ? {
            success: true,
            confirmBtnBsStyle: "success",
            cancelBtnBsStyle: "outline-success",
          }
        : { warning: true }),
    });
  };

  return (
    <div className="users mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Users</title>
        <meta name="description" content="Description of Users" />
      </Helmet>
      <Can moduleName={USER_MODULE} action={CREATE_ACTION}>
        <Row className="my-3">
          <div className="align-items-right ml-auto mr-3 mr-md-5">
            <Button
              color="primary"
              className="btn-icon btn-3"
              type="button"
              onClick={() => history.push("/user-form")}
            >
              <span className="btn-inner--icon">
                <i className="fas fa-plus" />
              </span>
              <span className="btn-inner--text">Add User</span>
            </Button>
          </div>
        </Row>
      </Can>
      <Table
        bootstrap4
        striped
        search={false}
        bordered={false}
        keyField="id"
        data={users}
        columns={[
          {
            text: "Name",
            dataField: "name",
            formatter: (cell) => cell || "N/A",
          },
          {
            text: "Email",
            dataField: "email",
            formatter: (cell) => cell || "N/A",
          },
          {
            text: "Roles",
            dataField: "roles",
            formatter: (cell) =>
              cell.map(({ role }) => <Badge color="primary">{role}</Badge>),
          },
          ...(useAccess(USER_MODULE, UPDATE_ACTION)
            ? [
                {
                  text: "Actions",
                  dataField: "isEnabled",
                  formatter: (cell, { id }) => (
                    <>
                      <Button
                        title="Edit User"
                        type="button"
                        color="primary"
                        size="sm"
                        onClick={() => history.push(`/user-form?id=${id}`)}
                      >
                        <span className="btn-inner--icon">
                          <i className="fas fa-edit" />
                        </span>
                      </Button>
                      {cell ? (
                        <Button
                          title="Deactivate Store"
                          type="button"
                          color="danger"
                          size="sm"
                          onClick={() => onUserStatusChange(id, false)}
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
                          onClick={() => onUserStatusChange(id, true)}
                        >
                          <span className="btn-inner--icon">
                            <i className="fas fa-check" />
                          </span>
                        </Button>
                      )}
                    </>
                  ),
                },
              ]
            : []),
        ]}
      />
      <Row className="mt-2">
        <Col className="text-end ms-auto">
          <PaginationDetails
            paginationDetails={paginationDetails}
            onClick={(page) => {
              dispatch(operations.fetchUsers({ page }));
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

Users.propTypes = {};
