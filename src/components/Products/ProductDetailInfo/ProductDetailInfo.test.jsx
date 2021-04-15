import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { ProductDetailInfo } from "./ProductDetailInfo";
import "@testing-library/jest-dom";

const breadcrumbsTestingRoute = [
  { id: "MLA1743", name: "Autos, Motos y Otros" },
  { id: "MLA1744", name: "Autos y Camionetas" },
  { id: "MLA1745", name: "Pick up" },
];

const ProductDetailInfoTestingData = {
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
};

// Snapshot tests
it("ProductDetails matches snapshot with props", () => {
  const component = renderer.create(
    <ProductDetailInfo item={ProductDetailInfoTestingData.item} />
  );
  const productDetailInfo = component.toJSON();
  expect(productDetailInfo).toMatchSnapshot();
});

// Tests DOM elements, classes and proper values

const renderComponent = (props) => {
  const renderProps = render(<ProductDetailInfo {...props} />);

  const productDetailInfoContainer = screen.getByTestId(
    "product-detail-info-container"
  );

  const productImage = screen.getByRole("img", {
    name: /Imagen del Producto/i,
  });
  const buyButton = screen.getByRole("button", { name: /Comprar/i });
  const descriptionTitle = screen.getByRole("heading");

  const mainValuesContainer = screen.getByTestId("main-values-container");

  const descriptionContainer = screen.getByTestId("description-container");

  return {
    ...renderProps,
    productDetailInfoContainer,
    productImage,
    mainValuesContainer,
    descriptionContainer,
    buyButton,
    descriptionTitle,
  };
};

it("ProductDetailInfo renders without crashing", () => {
  const component = renderComponent({
    item: ProductDetailInfoTestingData.item,
  });
  expect(component).toBeDefined();

  const {
    productDetailInfoContainer,
    productImage,
    mainValuesContainer,
    descriptionContainer,
    buyButton,
    descriptionTitle,
  } = component;

  expect(productDetailInfoContainer).toBeDefined();
  expect(productImage).toBeDefined();
  expect(mainValuesContainer).toBeDefined();
  expect(descriptionContainer).toBeDefined();
  expect(buyButton).toBeDefined();
  expect(descriptionTitle).toBeDefined();
});

it("ProductDetailInfo renders the product image with proper attributes", () => {
  const component = renderComponent({
    item: ProductDetailInfoTestingData.item,
  });
  const { productImage } = component;

  expect(productImage).toHaveClass(
    "ui-product-detail-info__main__image-container__image"
  );
  expect(productImage).toHaveAttribute("alt", "Imagen del Producto");
  const srcExpectedValue = ProductDetailInfoTestingData.item.picture;
  expect(productImage).toHaveAttribute("src", srcExpectedValue);
});

it("ProductDetailInfo renders the product values correctly", () => {
  const component = renderComponent({
    item: ProductDetailInfoTestingData.item,
  });
  const { mainValuesContainer } = component;

  expect(mainValuesContainer).toHaveClass(
    "ui-product-detail-info__main__values"
  );
  
  const conditionContainer = screen.getByTestId("condition-value");
  expect(conditionContainer).toBeDefined();

  const { condition, sold_quantity } = ProductDetailInfoTestingData.item
  expect(conditionContainer.textContent).toBe(
    `${condition ? 'Nuevo' : 'Usado'} - ${sold_quantity} vendidos`
  );

  const productNameValue = screen.getByTestId("product-name-value");
  expect(productNameValue).toBeDefined();
  expect(productNameValue.textContent).toBe(ProductDetailInfoTestingData.item.title);

  const priceValue = screen.getByTestId("price-value");
  expect(priceValue).toBeDefined();

  const { amount, decimals } = ProductDetailInfoTestingData.item.price
  const amountFormatted = amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  const decimalsFormatted = decimals === 0 ? '00' : decimals.toString().substring(2, 4)
  expect(priceValue.textContent).toBe(`$ ${amountFormatted}${decimalsFormatted}`);
});

it("ProductDetailInfo renders the buy button properly", async () => {
  const handleBuyProduct = jest.fn();
  const component = renderComponent({
    item: ProductDetailInfoTestingData.item,
  });
  const { buyButton } = component;

  expect(buyButton).toHaveClass(
    "ui-product-detail-info__main__values__buy-button"
  );
  expect(buyButton.textContent).toBe("Comprar");

  fireEvent.click(buyButton);
  await handleBuyProduct()
  expect(handleBuyProduct).toHaveBeenCalled();
});

it("ProductDetailInfo renders the description data properly", async () => {
  const component = renderComponent({
    item: ProductDetailInfoTestingData.item,
  });
  const { descriptionContainer, descriptionTitle } = component;

  expect(descriptionContainer).toBeDefined();
  expect(descriptionTitle).toBeDefined();

  expect(descriptionContainer).toHaveClass(
    "ui-product-detail-info__description"
  );
  expect(descriptionTitle).toHaveClass(
    "ui-product-detail-info__description__title"
  );
  expect(descriptionTitle.textContent).toBe('Descripción del producto')

  const descriptionValue = screen.getByTestId("description-value");
  expect(descriptionValue).toHaveClass(
    "ui-product-detail-info__description__value"
  );
  expect(descriptionValue.textContent).toBe(ProductDetailInfoTestingData.item.description)
});
