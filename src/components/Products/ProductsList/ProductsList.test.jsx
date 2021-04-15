import React from "react";
import renderer from "react-test-renderer";
import { ProductsList } from "./ProductsList";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter, Route, Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const ProductsListTestingData = {
  author: { name: 'Tomas', lastname: 'Damianovich' },
  categories: [ 'Ropa y Accesorios' ],
  items: [
    {
      id: 'MLA619208970',
      title: 'Remera Lisa Algodón Jersey Peinado Premium',
      price: [Object],
      picture: 'http://http2.mlstatic.com/D_935701-MLA43747292279_102020-O.jpg',
      condition: 'new',
      free_shipping: false,
      province: 'Buenos Aires'
    },
    {
      id: 'MLA860480339',
      title: 'Remera Algodón 100% Lisa Jersey Peinado Super Premium',
      price: [Object],
      picture: 'http://http2.mlstatic.com/D_848662-MLA42093064610_062020-O.jpg',
      condition: 'new',
      free_shipping: false,
      province: 'Capital Federal'
    },
    {
      id: 'MLA833408529',
      title: 'Remera Camiseta Deportiva Hombre Gdo Fit Running Ciclista',
      price: [Object],
      picture: 'http://http2.mlstatic.com/D_718294-MLA45402848939_032021-O.jpg',
      condition: 'new',
      free_shipping: false,
      province: 'Capital Federal'
    },
    {
      id: 'MLA861122315',
      title: 'Pack X 3 Remeras Básicas Algodón Blanco Negro Gris El Don',
      price: [Object],
      picture: 'http://http2.mlstatic.com/D_899897-MLA31022426100_062019-O.jpg',
      condition: 'new',
      free_shipping: true,
      province: 'Capital Federal'
    }
  ],
  breadcrumbs_route: [ { id: 'MLA1430', name: 'Ropa y Accesorios' } ],
  appUrl: 'http://localhost:9000/items'
};

// Snapshot tests
it("ProductsLists matches snapshot without props", () => {
  const history = createMemoryHistory();
  const component = renderer.create(
    <Router history={history}>
      <Route path="/items" exact={true} render={() => <ProductsList />} />
    </Router>
  );
  const ProductsList = component.toJSON();
  expect(ProductsList).toMatchSnapshot();
});

it("ProductsLists matches snapshot without props", () => {
  const history = createMemoryHistory();
  const component = renderer.create(
    <Router history={history}>
      <Route
        path="/items"
        exact={true}
        render={() => (
          <ProductsList staticContext={ProductsListTestingData} />
        )}
      />
    </Router>
  );
  const ProductsList = component.toJSON();
  expect(ProductsList).toMatchSnapshot();
});

// Tests DOM elements, classes and proper values

const renderComponent = (props) => {
  const renderProps = render(
    <BrowserRouter>
      <ProductsList {...props} />
    </BrowserRouter>
  );
  const searchForm = screen.getByTestId('search-form');
  const productsListContainer = screen.queryAllByTestId('product-list-container');
  const breadcrumbsContainer = screen.getByTestId('breadcrumbs-container');
  const productsItems = screen.queryAllByTestId('product-item-container');

  return {
    ...renderProps,
    productsListContainer,
    searchForm,
    breadcrumbsContainer,
    productsItems
  };
};

it("ProductsList renders without crashing", () => {
  const component = renderComponent({
    staticContext: ProductsListTestingData
  });
  expect(component).toBeDefined();

  // Checking the existence of the product detail container div
  const { productsListContainer, searchForm, productsItems, breadcrumbsContainer } = component;
  expect(productsListContainer[0]).toHaveClass("ui-product-list");

  // Checking that the searchComponent is rendered as a navbar in the product detail page
  expect(searchForm).toBeDefined();
  expect(searchForm).toBeInTheDocument();
  
  expect(productsItems).toBeDefined();
  expect(breadcrumbsContainer).toBeDefined();

});


it("ProductsList renders without crashing and the amount of items showed is correct", () => {
  const component = renderComponent({
    staticContext: ProductsListTestingData
  });
  // Checking the existence of the product detail container div
  const { productsItems } = component;
  
  expect(productsItems).toBeDefined();
  expect(productsItems.length).toBe(ProductsListTestingData.items.length);

});

it("ProductsList renders without crashing when no props are passed", () => {
  const component = render(
    <BrowserRouter>
      <ProductsList />
    </BrowserRouter>
  );
  expect(component).toBeDefined();
  const alertContainer = screen.getByTestId('alert-container')
  expect(alertContainer).toBeDefined();
  const infoVariant = "info"
  expect(alertContainer).toHaveClass(`ui-not-found-page ui-not-found-page--${infoVariant}`);
  expect(alertContainer.textContent).toBe('Cargando...');
});