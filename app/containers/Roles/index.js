/**
 *
 * Roles
 *
 */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col, Button } from "reactstrap";
import Table from "components/Table";
import { useInjectReducer } from "utils/injectReducer";
import PaginationDetails from "components/PaginationDetails";
import Can from "components/Can";
import {
  ROLE_MODULE,
  CREATE_ACTION,
  UPDATE_ACTION,
} from "../../utils/constants";
import { useAccess } from "utils/permissions";
import reducer from "./reducer";
import history from "../../utils/history";
import * as operations from "./actions";
import * as selectors from "./selectors";
import "./rolesStyle.scss";

export default function Roles() {
  useInjectReducer({ key: "roles", reducer });
  const dispatch = useDispatch();
  const { isLoading, roles, paginationDetails } = useSelector((state) => ({
    isLoading: selectors.isLoading(state),
    roles: selectors.roles(state),
    paginationDetails: selectors.paginationDetails(state),
  }));

  useEffect(() => {
    dispatch(operations.fetchRoles({ page: 1 }));
  }, []);

  return (
    <div className="roles mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Roles</title>
        <meta name="description" content="Description of Roles" />
      </Helmet>
      <Can moduleName={ROLE_MODULE} action={CREATE_ACTION}>
        <Row className="my-3">
          <div className="align-items-right ml-auto mr-3 mr-md-5">
            <Button
              color="primary"
              className="btn-icon btn-3"
              type="button"
              onClick={() => history.push("/role-form")}
            >
              <span className="btn-inner--icon">
                <i className="fas fa-plus" />
              </span>
              <span className="btn-inner--text">Add Role</span>
            </Button>
          </div>
        </Row>
      </Can>
      <Table
        bootstrap4
        striped
        search={false}
        bordered={false}
        keyField="_id"
        data={roles}
        columns={[
          {
            text: "Role Name",
            dataField: "role",
            formatter: (cell) => cell || "N/A",
          },
          {
            text: "Access",
            dataField: "access",
            formatter: (cell) =>
              cell.map(({ moduleName, create, read, update }) => {
                let access = "";
                if (create) access += "C";
                if (read) access += "R";
                if (update) access += "U";

                return (
                  <span
                    className="mr-3"
                    title="C - Create, R - Read, U - Update"
                  >
                    {moduleName} - {access}
                  </span>
                );
              }),
          },
          ...(useAccess(ROLE_MODULE, UPDATE_ACTION)
            ? [
                {
                  text: "Actions",
                  dataField: "actions",
                  dummyField: true,
                  formatter: (cell, { _id, role }) => (
                    <Button
                      disabled={role == "Super Admin"}
                      title="Edit Role"
                      type="button"
                      color="primary"
                      size="sm"
                      onClick={() => history.push(`/role-form?id=${_id}`)}
                    >
                      <span className="btn-inner--icon">
                        <i className="fas fa-edit" />
                      </span>
                    </Button>
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
              dispatch(operations.fetchRoles({ page }));
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

Roles.propTypes = {};
