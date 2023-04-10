/**
 *
 * Users
 *
 */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col, Button } from "reactstrap";
import AlertPopupHandler from "components/AlertPopup/AlertPopupHandler";
import PaginationDetails from "components/PaginationDetails";
import Table from "components/Table";
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

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(operations.fetchUsers({ page: 1 }));
  }, []);

  return (
    <div className="users mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Users</title>
        <meta name="description" content="Description of Users" />
      </Helmet>
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
      <Table
        bootstrap4
        striped
        search={false}
        bordered={false}
        keyField="_id"
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
        ]}
      />
      <Row className="mt-2">
        <Col className="text-end ms-auto">
          <PaginationDetails
            paginationDetails={paginationDetails}
            onClick={(page) => {
              setCurrentPage(page);
              dispatch(operations.fetchUsers({ page }));
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

Users.propTypes = {};
