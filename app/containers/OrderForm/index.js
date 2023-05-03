/**
 *
 * OrderForm
 *
 */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import { Row, Col, Button, Spinner, Form, FormGroup, Label } from "reactstrap";
import { get, map } from "lodash";
import reducer from "./reducer";
import * as operations from "./actions";
import * as selectors from "./selectors";
import moment from "moment-timezone";
import RtInput from "../../components/RtInput/index";
import RtCreatableSelect from "components/RtCreatableSelect";
import history from "../../utils/history";
import "./orderFormStyle.scss";

export default function OrderForm() {
  useInjectReducer({ key: "orderForm", reducer });
  const dispatch = useDispatch();
  const addOrderInit = operations.addOrderInit(dispatch);

  const {
    bulkStoreAlias,
    bulkStoreName,
    customerName,
    paymentMode,
    shopifyOrderDate,
    shopifyOrderName,
    shopifyPrice,
    weight,
    billingAddress,
    shippingAddress,
    shopifyOrderItems,
    isLoading,
    errorMessage,
    validations,
  } = useSelector((state) => ({
    bulkStoreAlias: selectors.bulkStoreAlias(state),
    bulkStoreName: selectors.bulkStoreName(state),
    customerName: selectors.customerName(state),
    paymentMode: selectors.paymentMode(state),
    shopifyOrderDate: selectors.shopifyOrderDate(state),
    shopifyOrderName: selectors.shopifyOrderName(state),
    shopifyPrice: selectors.shopifyPrice(state),
    weight: selectors.weight(state),
    billingAddress: selectors.billingAddress(state),
    shippingAddress: selectors.shippingAddress(state),
    shopifyOrderItems: selectors.shopifyOrderItems(state),
    isLoading: selectors.isLoading(state),
    errorMessage: selectors.errorMessage(state),
    validations: selectors.validations(state),
  }));

  useEffect(() => {
    return () => addOrderInit();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      operations.onSubmit({
        isBulkOrder: true,
        bulkStoreAlias,
        bulkStoreName,
        customerName,
        paymentMode,
        shopifyOrderDate: moment(shopifyOrderDate).valueOf(),
        shopifyOrderName,
        shopifyPrice,
        weight,
        billingAddress,
        shippingAddress,
        shopifyOrderItems,
      })
    );
  };

  const getSubmitButton = () => {
    if (isLoading)
      return (
        <>
          <Button type="button" color="primary" className="btn-icon" disabled>
            <span className="btn-inner-icon">
              <Spinner size="sm" className="mr-2" />
            </span>
            <span className="btn-inner-text">Add Order</span>
          </Button>
          <Button type="button" color="secondary" disabled>
            Cancel
          </Button>
        </>
      );
    return (
      <>
        <Button type="button" color="primary" onClick={(e) => onSubmit(e)}>
          Add Order
        </Button>
        <Button
          type="button"
          color="secondary"
          onClick={() => history.goBack()}
        >
          Cancel
        </Button>
      </>
    );
  };

  const getErrorComponent = () => {
    if (errorMessage)
      return (
        <Row className="justify-content-center mb-1 mt-3">
          <div className="text-center text-xs text-warning font-weight-bold">
            {errorMessage}
          </div>
        </Row>
      );
    return null;
  };

  return (
    <div className="orderForm  mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>OrderForm</title>
        <meta name="description" content="Description of OrderForm" />
      </Helmet>
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <div className="text-primary font-weight-bold">Order Form</div>
        </Col>
      </Row>
      <Form role="form" onSubmit={(e) => onSubmit(e)}>
        <FormGroup row>
          <Label sm={2}>
            Store Alias <span className="text-danger">*</span>
          </Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeStoreAlias(e))}
              type="text"
              placeholder="Eg: BG"
              error={validations}
              name="bulkStoreAlias"
              value={bulkStoreAlias}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>
            Store Name <span className="text-danger">*</span>
          </Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeStoreName(e))}
              type="text"
              placeholder="Eg: BigBasket"
              error={validations}
              name="bulkStoreName"
              value={bulkStoreName}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Customer Name</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeCustomerName(e))}
              type="text"
              placeholder="Eg: John"
              error={validations}
              name="customerName"
              value={customerName}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>
            Payment Mode <span className="text-danger">*</span>
          </Label>
          <Col sm={6}>
            <RtCreatableSelect
              name="description"
              placeholder="Payment Mode"
              options={[
                {
                  value: "COD",
                  label: "COD",
                },
                {
                  value: "Prepaid",
                  label: "Prepaid",
                },
              ]}
              value={paymentMode}
              onChange={(e) => {
                dispatch(operations.changePaymentMode(e));
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>
            Order Date <span className="text-danger">*</span>
          </Label>
          <Col sm={6}>
            <RtInput
              inputType="date"
              placeholder="Order Date"
              onChange={(e) => dispatch(operations.changeShopifyOrderDate(e))}
              value={shopifyOrderDate}
              name="shopifyOrderDate"
              error={validations}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>
            Order ID <span className="text-danger">*</span>
          </Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeShopifyOrderName(e))}
              type="text"
              placeholder="Eg: BG1021"
              error={validations}
              name="shopifyOrderName"
              value={shopifyOrderName}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>
            Order Price <span className="text-danger">*</span>
          </Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeShopifyPrice(e))}
              type="text"
              placeholder="Eg: 500"
              error={validations}
              name="shopifyPrice"
              value={shopifyPrice}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Weight (Gms)</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeWeight(e))}
              type="number"
              placeholder="Eg: 500"
              error={validations}
              name="weight"
              value={weight}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Billing Address</Label>
          <Col sm={3}>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeBillingAddress({
                    ...billingAddress,
                    name: e,
                  })
                )
              }
              type="text"
              placeholder="Name"
              error={validations}
              name="billingAddress.name"
              value={get(billingAddress, "name", "")}
            />
          </Col>
          <Col sm={3}>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeBillingAddress({
                    ...billingAddress,
                    address1: e,
                  })
                )
              }
              type="text"
              placeholder="Address Line 1"
              error={validations}
              name="billingAddress.address1"
              value={get(billingAddress, "address1", "")}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} />
          <Col sm={3}>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeBillingAddress({
                    ...billingAddress,
                    address2: e,
                  })
                )
              }
              type="text"
              placeholder="Address Line 2"
              error={validations}
              name="billingAddress.address2"
              value={get(billingAddress, "address2", "")}
            />
          </Col>
          <Col sm={3}>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeBillingAddress({
                    ...billingAddress,
                    city: e,
                  })
                )
              }
              type="text"
              placeholder="City"
              error={validations}
              name="billingAddress.city"
              value={get(billingAddress, "city", "")}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} />
          <Col sm={3}>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeBillingAddress({
                    ...billingAddress,
                    province: e,
                  })
                )
              }
              type="text"
              placeholder="Province"
              error={validations}
              name="billingAddress.province"
              value={get(billingAddress, "province", "")}
            />
          </Col>
          <Col sm={3}>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeBillingAddress({
                    ...billingAddress,
                    country: e,
                  })
                )
              }
              type="text"
              placeholder="Country"
              error={validations}
              name="billingAddress.country"
              value={get(billingAddress, "country", "")}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} />
          <Col sm={3}>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeBillingAddress({
                    ...billingAddress,
                    phone: e,
                  })
                )
              }
              type="text"
              placeholder="Phone"
              error={validations}
              name="billingAddress.phone"
              value={get(billingAddress, "phone", "")}
            />
          </Col>
          <Col sm={3}>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeBillingAddress({
                    ...billingAddress,
                    zip: e,
                  })
                )
              }
              type="text"
              placeholder="Zip"
              error={validations}
              name="billingAddress.zip"
              value={get(billingAddress, "zip", "")}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Shipping Address</Label>
          <Col sm={3}>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeShippingAddress({
                    ...shippingAddress,
                    name: e,
                  })
                )
              }
              type="text"
              placeholder="Name"
              error={validations}
              name="shippingAddress.name"
              value={get(shippingAddress, "name", "")}
            />
          </Col>
          <Col sm={3}>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeShippingAddress({
                    ...shippingAddress,
                    address1: e,
                  })
                )
              }
              type="text"
              placeholder="Address Line 1"
              error={validations}
              name="shippingAddress.address1"
              value={get(shippingAddress, "address1", "")}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} />
          <Col sm={3}>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeShippingAddress({
                    ...shippingAddress,
                    address2: e,
                  })
                )
              }
              type="text"
              placeholder="Address Line 2"
              error={validations}
              name="shippingAddress.address2"
              value={get(shippingAddress, "address2", "")}
            />
          </Col>
          <Col sm={3}>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeShippingAddress({
                    ...shippingAddress,
                    city: e,
                  })
                )
              }
              type="text"
              placeholder="City"
              error={validations}
              name="shippingAddress.city"
              value={get(shippingAddress, "city", "")}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} />
          <Col sm={3}>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeShippingAddress({
                    ...shippingAddress,
                    province: e,
                  })
                )
              }
              type="text"
              placeholder="Province"
              error={validations}
              name="shippingAddress.province"
              value={get(shippingAddress, "province", "")}
            />
          </Col>
          <Col sm={3}>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeShippingAddress({
                    ...shippingAddress,
                    country: e,
                  })
                )
              }
              type="text"
              placeholder="Country"
              error={validations}
              name="shippingAddress.country"
              value={get(shippingAddress, "country", "")}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} />
          <Col sm={3}>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeShippingAddress({
                    ...shippingAddress,
                    phone: e,
                  })
                )
              }
              type="text"
              placeholder="Phone"
              error={validations}
              name="shippingAddress.phone"
              value={get(shippingAddress, "phone", "")}
            />
          </Col>
          <Col sm={3}>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeShippingAddress({
                    ...shippingAddress,
                    zip: e,
                  })
                )
              }
              type="text"
              placeholder="Zip"
              error={validations}
              name="shippingAddress.zip"
              value={get(shippingAddress, "zip", "")}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} />
          <Col sm={3}>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeShippingAddress({
                    ...shippingAddress,
                    latitude: e,
                  })
                )
              }
              type="text"
              placeholder="Latitude"
              error={validations}
              name="shippingAddress.latitude"
              value={get(shippingAddress, "latitude", "")}
            />
          </Col>
          <Col sm={3}>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeShippingAddress({
                    ...shippingAddress,
                    longitude: e,
                  })
                )
              }
              type="text"
              placeholder="Longitude"
              error={validations}
              name="shippingAddress.longitude"
              value={get(shippingAddress, "longitude", "")}
            />
          </Col>
        </FormGroup>
        {map(shopifyOrderItems, (item, index) => (
          <React.Fragment key={index}>
            <FormGroup row>
              <Label sm={2}>
                Order Item {index + 1} <span className="text-danger">*</span>
              </Label>
              <Col sm={2}>
                <RtInput
                  onChange={(e) =>
                    dispatch(
                      operations.changeShopifyOrderItems({
                        payload: {
                          ...item,
                          sku: e,
                        },
                        index,
                      })
                    )
                  }
                  type="text"
                  placeholder="SKU"
                  error={validations}
                  name={`shopifyOrderItems[${index}].sku`}
                  value={get(item, "sku", "")}
                />
              </Col>
              <Col sm={2}>
                <RtInput
                  onChange={(e) =>
                    dispatch(
                      operations.changeShopifyOrderItems({
                        payload: {
                          ...item,
                          quantity: e,
                        },
                        index,
                      })
                    )
                  }
                  type="number"
                  placeholder="Quantity"
                  error={validations}
                  name={`shopifyOrderItems[${index}].quantity`}
                  value={get(item, "quantity", "")}
                />
              </Col>
              <Col sm={2}>
                <RtInput
                  onChange={(e) =>
                    dispatch(
                      operations.changeShopifyOrderItems({
                        payload: {
                          ...item,
                          price: e,
                        },
                        index,
                      })
                    )
                  }
                  type="text"
                  placeholder="Price"
                  error={validations}
                  name={`shopifyOrderItems[${index}].price`}
                  value={get(item, "price", "")}
                />
              </Col>
              {shopifyOrderItems.length !== 1 && (
                <Button
                  title="Delete Item"
                  size="sm"
                  color="danger"
                  onClick={() => dispatch(operations.deleteItem(index))}
                >
                  X
                </Button>
              )}
            </FormGroup>
            <FormGroup row>
              <Label sm={2} />
              <Col sm={6}>
                <RtInput
                  onChange={(e) =>
                    dispatch(
                      operations.changeShopifyOrderItems({
                        payload: {
                          ...item,
                          title: e,
                        },
                        index,
                      })
                    )
                  }
                  type="text"
                  placeholder="Title (Optional)"
                  error={validations}
                  name={`shopifyOrderItems[${index}].title`}
                  value={get(item, "title", "")}
                />
              </Col>
            </FormGroup>
          </React.Fragment>
        ))}
        <FormGroup row>
          <Label sm={2} />
          <Col sm={6} className="text-right">
            <Button
              color="link"
              className="p-0"
              onClick={() => dispatch(operations.addNewItem())}
            >
              + Add Item
            </Button>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col className="mt-3">{getSubmitButton()}</Col>
          <Col>{getErrorComponent()}</Col>
        </FormGroup>
      </Form>
    </div>
  );
}

OrderForm.propTypes = {};
