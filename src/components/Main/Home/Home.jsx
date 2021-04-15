import React from "react";

// imoport routing components
import { Switch, Route, Redirect } from "react-router-dom";

// import constants
import { constants } from '../../../utils/constants'

// import child components
import { SearchForm } from "../../Main/SearchForm";
import { ProductDetail } from "../../Products/ProductDetail";
import { ProductsList } from "../../Products/ProductsList";

/*
  This method is the main component of the application, it will handle the routing logic
  and redirects to the proper component. All this routes will be used in the server side
  to match a route declared in the server/routes.js module in order to make the server
  side rendering of each component.
*/

export class Home extends React.Component {
  
  constructor(props) {
    super();
  }
  
  render() {
    return (
      <div className="home-app">
        <Switch>
          <Route
            path="/"
            exact={true}
            render={() => (
              <SearchForm
                inputPlaceholder={constants.SEARCH.PLACEHOLDER_INPUT} />
            )}
          />
          <Route
            path="/items"
            exact={true}
            render={(props) => <ProductsList {...props}  />}
          />
          <Route
            path="/items/:id"
            exact={true}
            render={(props) => <ProductDetail {...props} />}
          />
          {/* If a not valid url is introduced we redirect to the main page. */}
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}
