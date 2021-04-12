import React from "react";
import axios from "axios";
import { urlGetter } from "../../../utils/helpers";
import { constants } from "../../../utils/constants";
import { SearchForm } from "../../Main/SearchForm";
import { useLocation } from "react-router-dom";
import { ProductBreadcrumbs } from "../ProductBreadcrumbs";
import { ProductListItem } from "../ProductListItem";
import { AlertMessage } from "../AlertMessage";

/*
  This method will show all the values retrieved while searching, is class components
  without hoooks due to we need to use componentdidmount that is not the same that useEffect
  to use react server side rendering (Mainly the static method fetchData is needed).
*/
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

    if (
      "staticContext" in props &&
      typeof props.staticContext !== "undefined"
    ) {
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
    this.getInitialValue = this.getInitialValue.bind(this);
    // this.getItemsPath = this.getItemsPath.bind(this);
  }

  // fetch data
  static fetchData(searchValue, appBaseUrl) {
    const defaultNotFoundResponse = {
      status: 404,
      message: "Not Found",
    };
    const { SEARCH_QUERY_PATH } = constants.MELI_API;
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

  getInitialValue() {
    let query = new URLSearchParams(useLocation().search);
    return query.get("search");
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
    const { items, breadcrumbs_route, appUrl } = this.state.data;
    return (
      <div className="ui-product-list">
        <SearchForm initialValue={this.getInitialValue} actionValue={appUrl} />
        {isLoading ? (
          "loading..."
        ) : (
          <div className="ui-product-list__body">
            {(!data || !items.length || data.status === 404) && (
              <AlertMessage
                message={constants.ZERO_PRODUCTS_FOUND.MESSAGE}
                variant={constants.ZERO_PRODUCTS_FOUND.VARIANT}
              />
            )}
            {data && !!items.length && (
              <div className="ui-product-list__body__items-container">
                <ProductBreadcrumbs route={breadcrumbs_route} />
                {items.map((item) => (
                  <ProductListItem item={item} key={item.id} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
