import React from "react";

// imoport routing components
import { Switch, Route, Redirect } from "react-router-dom";

// import constants
import { constants } from '../../../utils/constants'

// import child components
import { SearchForm } from "../../Main/SearchForm";
import { ProductDetail } from "../../Products/ProductDetail";
import { ProductsList } from "../../Products/ProductsList";

// export main home application component
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
            render={(props) => <ProductsList {...props} />}
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
