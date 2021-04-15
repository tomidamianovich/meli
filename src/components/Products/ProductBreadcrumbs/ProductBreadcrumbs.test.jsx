import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { ProductBreadcrumbs } from "./ProductBreadcrumbs";
import { constants } from "../../../utils/constants";
import "@testing-library/jest-dom";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

// Snapshot tests
it("ProductBreadcrumbs matches snapshot without props", () => {
  const component = renderer.create(
    <ProductBreadcrumbs />
  );
  const breadcrumb = component.toJSON();
  expect(breadcrumb).toMatchSnapshot();
});

it("ProductBreadcrumbs matches snapshot without props", () => {
  const component = renderer.create(
    <ProductBreadcrumbs route={breadcrumbsTestingRoute} />
  );
  const breadcrumb = component.toJSON();
  expect(breadcrumb).toMatchSnapshot();
});

// Tests DOM elements, classes and proper values

const breadcrumbsTestingRoute = [
  { id: "MLA1743", name: "Autos, Motos y Otros" },
  { id: "MLA1744", name: "Autos y Camionetas" },
  { id: "MLA1745", name: "Pick up" },
];

const renderComponent = (props) => {
  const renderProps = render(<ProductBreadcrumbs {...props} />);

  const breadcrumbContainer = screen.getByTestId("breadcrumbs-container");
  const breadcrumbsItems = screen.getAllByTestId(/breadcrumb-/i);
  const breadcrumbsArrows = screen.queryAllByTestId(/arrow-/i);

  return {
    ...renderProps,
    breadcrumbContainer,
    breadcrumbsItems,
    breadcrumbsArrows,
  };
};

it("Breadcrumbs renders without crashing and is an empty wrapper if we dont send a breadcrumbs route", () => {
  const component = render(<ProductBreadcrumbs />);
  expect(component).toBeDefined();
  const breadcrumbContainer = screen.getByTestId("breadcrumbs-container");
  expect(breadcrumbContainer).toBeDefined();
  expect(breadcrumbContainer).toBeEmptyDOMElement();
});

it("Breadcrumbs renders without crashing and is an empty wrapper if we dont send a breadcrumbs route", () => {
  const component = renderComponent({
    route: breadcrumbsTestingRoute,
  });
  const { breadcrumbContainer, breadcrumbsItems } = component;
  expect(breadcrumbContainer).toBeDefined();
  expect(breadcrumbContainer).not.toBeEmptyDOMElement();
  expect(breadcrumbsItems.length).toBe(breadcrumbsTestingRoute.length);
  breadcrumbsItems.forEach((breadcrumb, index) => {
    expect(breadcrumb).toHaveClass(
      "ui-breadcrumbs-container__breadcrumbs__item"
    );
    expect(breadcrumb.textContent).toBe(breadcrumbsTestingRoute[index].name);
  });
});

it("Breadcrumbs renders an arrow icon if it not root category (last one)", () => {
  const component = renderComponent({
    route: breadcrumbsTestingRoute,
  });
  const { breadcrumbsArrows } = component;
  // The last one will not have an arrow at the right side of it.
  expect(breadcrumbsArrows.length).toBe(breadcrumbsTestingRoute.length - 1);
  expect(breadcrumbsArrows[0]).toHaveClass(
    "ui-breadcrumbs-container__breadcrumbs__item__next-item"
  );
  expect(breadcrumbsArrows[1]).toHaveClass(
    "ui-breadcrumbs-container__breadcrumbs__item__next-item"
  );
});

it("No arrow is showed when there is only 1 category in the breadcrumbs", () => {
  const component = renderComponent({
    route: [...[breadcrumbsTestingRoute[0]]],
  });
  const { breadcrumbsItems } = component;
  const rootBreadcrumbItem = breadcrumbsItems[0];
  expect(rootBreadcrumbItem).toHaveClass(
    "ui-breadcrumbs-container__breadcrumbs__item"
  );
  const arrow = screen.queryAllByTestId("/arrow-/i");
  expect(arrow.length).toBe(0);
});
