import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import renderer from 'react-test-renderer';
import { Home } from './Home';
import { BrowserRouter } from "react-router-dom";
import { constants } from "../../../utils/constants"
import '@testing-library/jest-dom'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'


// Snapshot tests
it('Home matches snapshot without props', () => {
  const history = createMemoryHistory()
  const component = renderer.create(
    <Router history={history}>
      <Home />
    </Router>
  );
  const searchForm = component.toJSON();
  expect(searchForm).toMatchSnapshot();
});

// Tests DOM elements, classes and proper values

const renderComponent = (props) => {
  const history = createMemoryHistory()
  const renderProps = render(
    <Router history={history}>
      <SearchForm {...props} />
    </Router>
  );

  return {
    ...renderProps
  };
};

it('Home router pages renders without crashing', () => {
  const component = renderComponent
  expect(component).toBeDefined();
});
