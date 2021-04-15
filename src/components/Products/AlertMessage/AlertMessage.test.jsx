import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import renderer from 'react-test-renderer';
import { AlertMessage } from './AlertMessage';
import { constants } from "../../../utils/constants"
import '@testing-library/jest-dom'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'


// Snapshot tests
it('AlertMessage matches snapshot without props', () => {
  const component = renderer.create(
    <AlertMessage message="test" />
  );
  const alertMessage = component.toJSON();
  expect(alertMessage).toMatchSnapshot();
});

// Tests DOM elements, classes and proper values

const renderComponent = (props) => {
  const renderProps = render(
    <AlertMessage {...props} />
  );

  const alertContainer = screen.getByTestId('alert-container')
  const alertText = alertContainer.querySelector('p')
  return {
    ...renderProps,
    alertContainer,
    alertText
  };
};

it('AlertMessage router pages renders without crashing', () => {
  const component = renderComponent({
    message: 'Testing'
  })
  expect(component).toBeDefined();
});

it('AlertMessage is not showed when the message value is empty', () => {
  const component = render(
    <AlertMessage />
  );
  expect(component).toBeDefined();
  expect(component.baseElement.firstChild).toBeEmptyDOMElement()
});


it('Default AlertMessage is showed when the message value is not empty', () => {
  const component = renderComponent({
    message: 'Testing default alert'
  })
  expect(component).toBeDefined();
  const { alertContainer, alertText } = component;
  const defaultVariant = "default"
  expect(alertContainer).toHaveClass(`ui-not-found-page ui-not-found-page--${defaultVariant}`);
  expect(alertContainer.textContent).toBe('Testing default alert');
  expect(alertText).toHaveClass(`ui-not-found-page--${defaultVariant}__text`);
});


it('Warning AlertMessage is showed when the message value is not empty', () => {
  const customVariant = "warning"
  const component = renderComponent({
    message: `Testing ${customVariant} alert`,
    variant: customVariant
  })
  const { alertContainer, alertText } = component;
  expect(alertContainer).toHaveClass(`ui-not-found-page ui-not-found-page--${customVariant}`);
  expect(alertContainer.textContent).toBe(`Testing ${customVariant} alert`);
  expect(alertText).toHaveClass(`ui-not-found-page--${customVariant}__text`);
});
