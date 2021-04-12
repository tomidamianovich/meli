import React from "react";
import axios from "axios";
import { urlGetter } from "../../../utils/helpers";
import { constants } from "../../../utils/constants";
import { SearchForm } from "../../Main/SearchForm";
import { ProductBreadcrumbs } from "../ProductBreadcrumbs";
import { ProductDetailInfo } from "../ProductDetailInfo";
import { ProductNotFound } from "../ProductNotFound";

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
    const { item, status, appUrl } = data;
    return (
      <div className="ui-product-detail">
        <SearchForm initialValue={this.getInitialValue} actionValue={appUrl} />
        {isLoading ? (
          <ProductNotFound
            message={constants.LOADING.MESSAGE}
            variant={constants.LOADING.VARIANT}
          />
        ) : (
          <div className="ui-product-detail__body">
            {(!data || status === 404) && (
              <ProductNotFound
                message={constants.PRODUCT_NOT_FOUND.MESSAGE}
                variant={constants.PRODUCT_NOT_FOUND.VARIANT}
              />
            )}
            {data && item && (
              <div>
                <ProductBreadcrumbs route={item.breadcrumbs_route} />
                <ProductDetailInfo item={item} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
