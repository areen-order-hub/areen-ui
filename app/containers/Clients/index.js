/**
 *
 * Clients
 *
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Button, Table, Badge } from "reactstrap";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import history from "../../utils/history";
import * as selectors from "./selectors";
import * as operations from "./actions";

import Can from "components/Can";
import { permissions } from "utils/permissions";
import "./clientsStyle.scss";

export default function Clients() {
  useInjectReducer({ key: "clients", reducer });
  const dispatch = useDispatch();
  const { isLoading, clients } = useSelector((state) => ({
    isLoading: selectors.isLoading(state),
    clients: selectors.clients(state),
  }));

  React.useEffect(() => {
    dispatch(operations.fetchClients());
  }, []);

  const onClick = (id) =>
    history.push({
      pathname: `/client/${id}`,
      state: { id },
    });

  const getClientData = () => {
    return clients.map(
      ({
        id,
        name,
        industry,
        products,
        officeCity,
        noOfSpocs,
        noOfPositions,
        website,
      }) => (
        <React.Fragment key={id}>
          <tr>
            <td
              className="hover-pointer text-primary"
              onClick={() => onClick(id)}
            >
              {name}
            </td>
            <td>
              {industry.map((industry, index) => (
                <Badge
                  color={industry == "Manufacturing" ? "primary" : "warning"}
                  key={index}
                >
                  {industry}
                </Badge>
              ))}
            </td>
            <td>
              {products.map((product, index) => (
                <Badge color="primary" key={index}>
                  {product}
                </Badge>
              ))}
            </td>
            <td>{officeCity}</td>
            <td>{noOfSpocs}</td>
            <td>{noOfPositions}</td>
            <td>
              <Button
                title="View Client"
                type="button"
                color="info"
                size="sm"
                onClick={(e) => onClick(id)}
              >
                <span className="btn-inner--icon">
                  <i className="fas fa-eye" />
                </span>
              </Button>
              <Button
                title="Open Website"
                type="button"
                color="success"
                size="sm"
                onClick={(e) => window.open(website, "_blank")}
              >
                <span className="btn-inner--icon">
                  <i className="fas fa-globe" />
                </span>
              </Button>
              <Can permissions={[permissions.UPDATE_A_CLIENT]}>
                <Button
                  title="Edit Client"
                  type="button"
                  color="primary"
                  size="sm"
                  onClick={() => history.push(`/add-client?id=${id}`)}
                >
                  <span className="btn-inner--icon">
                    <i className="fas fa-edit" />
                  </span>
                </Button>
              </Can>
            </td>
          </tr>
        </React.Fragment>
      )
    );
  };

  return (
    <div className="clients mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Clients</title>
        <meta name="description" content="Description of Clients" />
      </Helmet>
      <Can permissions={[permissions.ADD_A_CLIENT]}>
        <Row className="mt-3">
          <div className="align-items-right ml-auto mr-3 mr-md-5">
            <Button
              color="primary"
              className="btn-icon btn-3"
              type="button"
              onClick={() => history.push("/add-client")}
            >
              <span className="btn-inner--icon">
                <i className="fas fa-plus" />
              </span>
              <span className="btn-inner--text">Add Client</span>
            </Button>
          </div>
        </Row>
      </Can>
      <div className="table-responsive">
        <Table className="mt-3 align-items-center">
          <thead className="thead-light">
            <tr>
              <th scope="col">Client Name</th>
              <th scope="col">Industry</th>
              <th scope="col">Products</th>
              <th scope="col ">Head Office</th>
              <th scope="col">No. of Spocs</th>
              <th scope="col">No. of Positions</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{getClientData()}</tbody>
        </Table>
      </div>
    </div>
  );
}

Clients.propTypes = {};
