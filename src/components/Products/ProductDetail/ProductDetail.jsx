import React from "react";
import axios from "axios";
import { urlGetter } from "../../../utils/urlGetter";
import { constants } from "../../../utils/constants";

export class ProductDetail extends React.Component {
  constructor(props) {
    super();
    if ("staticContext" in props) {
      this.state = {
        isLoading: false,
        data: props.staticContext,
      };
    } else if ("window" in props && "initial_state" in props.window)
      this.state = {
        isLoading: false,
        data: props.window.initial_state,
      };
    else {
      this.state = {
        isLoading: true,
        data: {},
      };
    }
  }

  /*
    This static methods will be called with componentDidMount lifecycle method and
    params passed via the server module. Once we receive the data, we will update 
    the component state and it will display the product detail data.
  */
  static fetchData(id, appBaseUrl) {
    const defaultNotFoundResponse = {
      status: 404,
      message: "Not Found",
    };
    const { ID_PATH } = constants.MELI_API;
    return axios
      .get(urlGetter(appBaseUrl, ID_PATH, id))
      .then((response) =>
        "data" in response ? response.data : defaultNotFoundResponse
      )
      .catch((error) => {
        return {
          status:
            "response" in error && "status" in error.response
              ? error.response.status
              : defaultNotFoundResponse.status,
          message:
            "message" in error
              ? error.message
              : defaultNotFoundResponse.message,
        };
      });
  }

  // When component mounts, fetch data
  componentDidMount() {
    /* If the current "isLoading" state value is false, we dont fetch the data. 
    if not return pattern used as a good practice to decrease indention level */
    if (!this.state.isLoading) return;
    ProductDetails.fetchData().then((data) =>
      this.setState({
        isLoading: false,
        data,
      })
    );
  }

  render() {
    const { isLoading, data } = this.state;
    const { author, item, status } = data;
    const { name, lastname } = author;
    const {
      id,
      title,
      price,
      picture,
      condition,
      free_shipping,
      sold_quantity,
      description,
    } = item;
    return (
      <div className="ui-product-detail">
        <p className="ui-product-detail__title">PRODUCT DETAIL PAGE</p>
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <div className="ui-product-detail__body">
            {!data || !status || (status === 404 && <p>Error with status{data.status}</p>)}
            {data && item && (
              <div>
                <p className="ui-product-detail__body__title">AUTOR:</p>
                <p className="ui-product-detail__body__description">
                  Name: {name}
                </p>
                <p className="ui-product-detail__body__description">
                  Lastname: {lastname}
                </p>
                <p className="ui-product-detail__body__title">ITEM:</p>
                <p className="ui-product-detail__body__description">id: {id}</p>
                <p className="ui-product-detail__body__description">
                  title: {title}
                </p>
                <p className="ui-product-detail__body__description">
                  price.currency: {price.currency}
                  price.amount: {price.amount}
                  price.decimals: {price.decimals}
                </p>
                <p className="ui-product-detail__body__description">
                  picture: {picture}
                </p>
                <p className="ui-product-detail__body__description">
                  condition: {condition}
                </p>
                <p className="ui-product-detail__body__description">
                  shipping: {`${free_shipping}`}
                </p>
                <p className="ui-product-detail__body__description">
                  sold_quantity: {sold_quantity}
                </p>
                <p className="ui-product-detail__body__description">
                  description: {description}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
