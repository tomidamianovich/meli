import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { ProductListItem } from "./ProductListItem";
import "@testing-library/jest-dom";

const breadcrumbsTestingRoute = [
  { id: "MLA1743", name: "Autos, Motos y Otros" },
  { id: "MLA1744", name: "Autos y Camionetas" },
  { id: "MLA1745", name: "Pick up" },
];

const ProductListItemTestingData = {
  item: {
    id: 'MLA619208970',
    title: 'Remera Lisa Algodón Jersey Peinado Premium',
    price: {
      currency: "ARS",
      amount: 1376,
      decimals: 0.8199999999999363,
    },
    picture: 'http://http2.mlstatic.com/D_935701-MLA43747292279_102020-O.jpg',
    condition: 'new',
    free_shipping: false,
    province: 'Buenos Aires'
  }
};

// Snapshot tests
it("ProductDetails matches snapshot with props", () => {
  const component = renderer.create(
    <ProductListItem item={ProductListItemTestingData.item} />
  );
  const productListItem = component.toJSON();
  expect(productListItem).toMatchSnapshot();
});

// Tests DOM elements, classes and proper values

const renderComponent = (props) => {
  const renderProps = render(<ProductListItem {...props} />);

  const productListItemContainer = screen.getByTestId(
    "product-item-container"
  );

  const productImage = screen.getByRole("img", {
    name: /Imagen del Producto/i,
  });

  const descriptionContainer = screen.getByTestId("description-container");
  
  const provinceContainer = screen.getByTestId("province-container");

  return {
    ...renderProps,
    productListItemContainer,
    productImage,
    descriptionContainer,
    provinceContainer
  };
};

it("ProductListItem renders without crashing", () => {
  const component = renderComponent({
    item: ProductListItemTestingData.item,
  });
  expect(component).toBeDefined();

  const {
    productListItemContainer,
    productImage,
    descriptionContainer,
    provinceContainer
  } = component;

  expect(productListItemContainer).toBeDefined();
  expect(productImage).toBeDefined();
  expect(descriptionContainer).toBeDefined();
  expect(provinceContainer).toBeDefined();
});


it("ProductListItem renders without crashing", () => {
  const component = renderComponent({
    item: ProductListItemTestingData.item,
  });
  expect(component).toBeDefined();

  const {
    productListItemContainer,
    productImage,
    descriptionContainer,
    provinceContainer
  } = component;

  expect(productListItemContainer).toBeDefined();
  expect(productImage).toBeDefined();
  expect(descriptionContainer).toBeDefined();
  expect(provinceContainer).toBeDefined();
});

it("ProductListItem renders the product image with proper attributes", () => {
  const component = renderComponent({
    item: ProductListItemTestingData.item,
  });
  const { productImage } = component;

  expect(productImage).toHaveClass(
    "ui-product-item__image-container__image"
  );
  expect(productImage).toHaveAttribute("alt", "Imagen del Producto");
  const srcExpectedValue = ProductListItemTestingData.item.picture;
  expect(productImage).toHaveAttribute("src", srcExpectedValue);
});

it("ProductListItem renders the product values correctly", () => {
  const component = renderComponent({
    item: ProductListItemTestingData.item,
  });
  const { descriptionContainer, provinceContainer } = component;

  expect(descriptionContainer).toHaveClass(
    "ui-product-item__description-container"
  );

  const priceValue = screen.getByTestId('price-value')
  expect(priceValue).toBeInTheDocument()
  const { amount } = ProductListItemTestingData.item.price
  expect(priceValue.textContent).toBe(`$ ${amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`)
  
  const productTitle = screen.getByTestId('product-title')
  expect(productTitle).toBeInTheDocument()

  const { title, province } = ProductListItemTestingData.item
  expect(productTitle.textContent).toBe(title)

  expect(provinceContainer).toBeDefined()
  expect(provinceContainer).toBeInTheDocument()
  expect(provinceContainer.textContent).toBe(province)
});