import React from "react";
import axios from "axios";
import { urlGetter } from '../../../utils/urlGetter'
import { constants } from '../../../utils/constants'

export class ProductsList extends React.Component {
  constructor(props) {
    super();

    /*
      The server at first will fetch the component data by calling the static fetchData() 
      method of the component (if exists), then it passes the response to the component using 
      context prop of the StaticRouter and then it sets the initial_data global variable 
      so that component can access the fetched data on the client-side.

      So now in the constructor we add this conditional setState depending on the scenario.
    */

    if ("staticContext" in props && typeof props.staticContext !== "undefined") {
      this.state = {
        isLoading: false,
        data: props.staticContext,
      };
    } else if (window && "initial_state" in window) {
      this.state = {
        isLoading: false,
        data: window.initial_state,
      };
    } else {
      this.state = {
        isLoading: true,
        data: {},
      };
    }
  }

  // fetch data
  static fetchData(searchValue, appBaseUrl) {
    const defaultNotFoundResponse = {
      status: 404,
      message: "Not Found",
    };
    const { SEARCH_QUERY_PATH } = constants.MELI_API
    return axios
      .get(urlGetter(appBaseUrl, SEARCH_QUERY_PATH, searchValue))
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

  // when component mounts, fetch data
  componentDidMount() {
    // If the current "isLoading" state value is false, we dont fetch the data.
    if (!this.state.isLoading) return;
    ProductsList.fetchData().then((data) =>
      this.setState({
        isLoading: false,
        data,
      })
    );
  }

  render() {
    const { isLoading, data } = this.state;
    const { name, lastname } = this.state.data.author;
    const { categories, items, breadcrumbs_route } = this.state.data;
    return (
      <div className="ui-product-detail">
        <p className="ui-product-detail__title">PRODUCT LIST PAGE</p>
        {isLoading ? (
          "loading..."
        ) : (
          <div className="ui-product-detail__body">
            {(!data || !items.length || data.status === 404) && (
              <div>Not items found {data.status} </div>
            )}
            {data && !!items.length && (
              <div>
                <p className="ui-product-detail__body__title">
                  AUTOR:
                </p>
                <p className="ui-product-detail__body__description">
                  Name: {name}
                </p>
                <p className="ui-product-detail__body__description">
                  Lastname: {lastname}
                </p>
                <p className="ui-product-detail__body__title">
                  breadcrumbs results:
                </p>
                { breadcrumbs_route.map((breadcrumb, index) => 
                  <p className="ui-product-detail__body__description" key={index}>
                    { breadcrumb.name } {'>'}
                  </p>
                )}
                <p className="ui-product-detail__body__title">
                  CATEGORIAS:
                </p>
                { categories.map((category, index) => 
                  <p className="ui-product-detail__body__description" key={index}>
                    { category }
                  </p>
                )}
                <p className="ui-product-detail__body__title">
                  ITEMS:
                </p>
                { items.map((item, index) => 
                  <div key={index}>
                    <p className="ui-product-detail__body__title">
                      ITEMS ID #{item.id}
                    </p>
                    <p className="ui-product-detail__body__description">
                     title: {item.title}
                    </p>
                    <p className="ui-product-detail__body__description">
                      price.currency: {item.price.currency}
                      price.amount: {item.price.amount}
                      price.decimals: {item.price.decimals}
                    </p>
                    <p className="ui-product-detail__body__description">
                      picture: {item.picture}
                    </p>
                    <p className="ui-product-detail__body__description">
                      condition: {item.condition}
                    </p>
                    <p className="ui-product-detail__body__description">
                      free_shipping: {`${item.free_shipping}`}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
