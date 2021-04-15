import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { ProductDetail } from "./ProductDetail";
import { constants } from "../../../utils/constants";
import "@testing-library/jest-dom";
import { BrowserRouter, Route, Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const breadcrumbsTestingRoute = [
  { id: "MLA1743", name: "Autos, Motos y Otros" },
  { id: "MLA1744", name: "Autos y Camionetas" },
  { id: "MLA1745", name: "Pick up" },
];

const ProductDetailTestingData = {
  author: { name: "Tomas", lastname: "Damianovich" },
  item: {
    id: "MLA682323426",
    title: "X12 Copón Flint, Rigolleau - Bazar Colucci",
    price: {
      currency: "ARS",
      amount: 1376,
      decimals: 0.8199999999999363,
    },
    picture: "http://http2.mlstatic.com/D_715440-MLA45547454177_042021-I.jpg",
    condition: "new",
    free_shipping: false,
    sold_quantity: 250,
    description: "Description Test",
    breadcrumbs_route: breadcrumbsTestingRoute,
  },
  appUrl: "http://localhost:9000/items",
};

// Snapshot tests
it("ProductDetails matches snapshot without props", () => {
  const history = createMemoryHistory();
  const component = renderer.create(
    <Router history={history}>
      <Route path="/items/:id" exact={true} render={() => <ProductDetail />} />
    </Router>
  );
  const ProductDetail = component.toJSON();
  expect(ProductDetail).toMatchSnapshot();
});

it("ProductDetails matches snapshot without props", () => {
  const history = createMemoryHistory();
  const component = renderer.create(
    <Router history={history}>
      <Route
        path="/items/:id"
        exact={true}
        render={() => (
          <ProductDetail staticContext={ProductDetailTestingData} />
        )}
      />
    </Router>
  );
  const ProductDetail = component.toJSON();
  expect(ProductDetail).toMatchSnapshot();
});

// Tests DOM elements, classes and proper values

const renderComponent = (props) => {
  const history = createMemoryHistory();
  const renderProps = render(
    <BrowserRouter>
      <ProductDetail {...props} />
    </BrowserRouter>
  );
  const productDetailContainer = screen.queryAllByTestId(
    "product-detail-container"
  );
  return {
    ...renderProps,
    productDetailContainer,
  };
};

it("ProductDetail renders without crashing despite of the fact that no props where provided", () => {
  const component = renderComponent();
  expect(component).toBeDefined();

  // Checking the existence of the product detail container div
  const { productDetailContainer } = component;
  expect(productDetailContainer.length).toBe(1);
  expect(productDetailContainer[0]).toHaveClass("ui-product-detail");

  // Checking that the searchComponent is rendered as a navbar in the product detail page
  const searchComponent = screen.getByTestId("search-form");
  expect(searchComponent).toBeDefined();
  expect(searchComponent).toBeInTheDocument();

  // As we are not sending props inside the product details components we are setting
  // the state as => {Data: {}, loading: true} So the loading should be visible.
  const loadingAlertComponent = screen.getByTestId("alert-container");
  expect(loadingAlertComponent).toBeDefined();
  expect(loadingAlertComponent).toBeInTheDocument();
  expect(loadingAlertComponent.textContent).toBe(constants.LOADING.MESSAGE);
  expect(loadingAlertComponent).toHaveClass(
    `ui-not-found-page ui-not-found-page--${constants.LOADING.VARIANT}`
  );

  const notFoundAlertComponent = screen.getByTestId("alert-container");
  expect(notFoundAlertComponent.textContent).not.toBe(
    constants.PRODUCT_NOT_FOUND.MESSAGE
  );
});

it("ProductDetail handles product details errors when product has 'not found' response ", () => {
  const component = renderComponent({
    staticContext: {
      data: {},
      status: 404,
    },
  });
  expect(component).toBeDefined();

  // Checking the existence of the product detail container div
  const { productDetailContainer } = component;
  expect(productDetailContainer.length).toBe(1);
  expect(productDetailContainer[0]).toHaveClass("ui-product-detail");

  // Checking that the searchComponent is rendered as a navbar in the product detail page
  const searchComponent = screen.getByTestId("search-form");
  expect(searchComponent).toBeDefined();
  expect(searchComponent).toBeInTheDocument();

  // As we are now sending props inside the product details components we are setting
  // the state as => {Data: ...status 400, loading: false} So the loading should be visible
  const loadingAlertComponent = screen.getByTestId("alert-container");
  expect(loadingAlertComponent.textContent).not.toBe(constants.LOADING.MESSAGE);

  // As we are not sending props inside the product details components we are setting
  // the state as => {Data: {}, loading: true} So the loading should be visible.
  const notFoundAlertComponent = screen.getByTestId("alert-container");
  expect(notFoundAlertComponent).toBeDefined();
  expect(notFoundAlertComponent).toBeInTheDocument();
  expect(notFoundAlertComponent.textContent).toBe(
    constants.PRODUCT_NOT_FOUND.MESSAGE
  );
  expect(notFoundAlertComponent).toHaveClass(
    `ui-not-found-page ui-not-found-page--${constants.PRODUCT_NOT_FOUND.VARIANT}`
  );
});

it("ProductDetail handles product details success response with the respective item and breadcrumbs ", () => {
  const component = renderComponent({
    staticContext: ProductDetailTestingData
  })
  expect(component).toBeDefined();

  // Checking the existence of the product detail container div
  const { productDetailContainer } = component
  expect(productDetailContainer.length).toBe(1)
  expect(productDetailContainer[0]).toHaveClass('ui-product-detail')

  // Checking that the searchComponent is rendered as a navbar in the product detail page
  const searchComponent = screen.getByTestId("search-form");
  expect(searchComponent).toBeDefined()
  expect(searchComponent).toBeInTheDocument()

  // As we are now sending as props the product data the alertmessage component shouldnt be being 
  // showed due to we are not in a loading state and neither in a error one.
  const alertMessageComponent = screen.queryAllByTestId("alert-container");
  expect(alertMessageComponent.length).toBe(0) // Amount of alerts equal to zero => Not showed.


  // When data is coming from the server and an item key comes inside the data object we are showing
  // the productDetailItem that contains as childs the breadcrumbs and the productDetailInfo
  const productDetailItem =  screen.getByTestId('product-detail-item-container');
  expect(productDetailItem).toBeVisible()
  
  const breadcrumbsComponent = screen.getByTestId('breadcrumbs-container');
  expect(breadcrumbsComponent).toBeVisible()

  const productDetailInfoComponent = screen.getByTestId('product-detail-info-container');
  expect(productDetailInfoComponent).toBeVisible()
  
});
