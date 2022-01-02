/**
 *
 * Recruiters
 *
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import { Row, Button, Table } from "reactstrap";
import AlertPopupHandler from "components/AlertPopup/AlertPopupHandler";
import * as operations from "./actions";
import history from "utils/history";
import * as selectors from "./selectors";
import "./recruitersStyle.scss";

export default function Recruiters() {
  useInjectReducer({
    key: "recruiters",
    reducer,
  });
  const dispatch = useDispatch();
  const { isLoading, recruiters } = useSelector((state) => ({
    isLoading: selectors.isLoading(state),
    recruiters: selectors.recruiters(state),
  }));

  React.useEffect(() => {
    dispatch(operations.fetchRecruiters());
  }, []);

  const onRecruiterStatusChange = (id, enabled) => {
    AlertPopupHandler.open({
      onConfirm: () =>
        dispatch(
          operations.updateRecruiterStatus(id, {
            enabled,
          })
        ),
      confirmBtnText: enabled ? "Enable" : "Suspend",
      text: enabled
        ? `You are about to enable this recruiter's account. Do you want to continue?`
        : `You are about to suspend the recruiter. Do you want to continue?`,
      data: {},
      customClass: "text-xs",
      btnSize: "sm",
      ...(enabled
        ? {
            success: true,
            confirmBtnBsStyle: "success",
            cancelBtnBsStyle: "outline-sucess",
          }
        : { warning: true }),
    });
  };

  const onClickView = (id) => {
    history.push({
      pathname: `/profile/${id}`,
      state: { id },
    });
  };

  const getRecruitersData = () => {
    return recruiters.map(
      ({ id, name, email, phoneNumber, designation, enabled }) => (
        <React.Fragment key={id}>
          <tr>
            <td
              className="text-primary hover-pointer"
              onClick={() => onClickView(id)}
            >
              {name}
            </td>
            <td>{phoneNumber || "-"}</td>
            <td>{email}</td>
            <td>{designation || "-"}</td>
            <td>
              <Button
                title="View Recruiter"
                type="button"
                color="info"
                size="sm"
                onClick={() => onClickView(id)}
              >
                <span className="btn-inner--icon">
                  <i className="fas fa-eye" />
                </span>
              </Button>
              <Button
                title="Edit Recruiter"
                type="button"
                color="primary"
                size="sm"
                onClick={() => history.push(`/add-recruiter?id=${id}`)}
              >
                <span className="btn-inner--icon">
                  <i className="fas fa-edit" />
                </span>
              </Button>
              {enabled ? (
                <Button
                  title="Suspend Recruiter"
                  type="button"
                  color="danger"
                  size="sm"
                  onClick={() => onRecruiterStatusChange(id, false)}
                >
                  <span className="btn-inner--icon">
                    <i className="fas fa-ban" />
                  </span>
                </Button>
              ) : (
                <Button
                  title="Enable Recruiter"
                  type="button"
                  color="success"
                  size="sm"
                  onClick={() => onRecruiterStatusChange(id, true)}
                >
                  <span className="btn-inner--icon">
                    <i className="fas fa-sign-in-alt" />
                  </span>
                </Button>
              )}
            </td>
          </tr>
        </React.Fragment>
      )
    );
  };

  return (
    <div className="recruiters mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Recruiters</title>
        <meta name="description" content="Description of Recruiters" />
      </Helmet>
      <Row className="mt-3">
        <div className="align-items-right ml-auto mr-3 mr-md-5">
          <Button
            color="primary"
            className="btn-icon btn-3"
            type="button"
            onClick={() => history.push("/add-recruiter")}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-plus" />
            </span>
            <span className="btn-inner--text">Add Recruiter</span>
          </Button>
        </div>
      </Row>
      <div className="table-responsive">
        <Table className="mt-3 align-items-center">
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Mobile</th>
              <th scope="col">Email</th>
              <th scope="col">Designation</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{getRecruitersData()}</tbody>
        </Table>
      </div>
    </div>
  );
}

Recruiters.propTypes = {};
