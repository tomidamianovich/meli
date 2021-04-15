import React from 'react';
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer';
import { Home } from './Home';
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
      <Home {...props} />
    </Router>
  );

  return {
    ...renderProps
  };
};

it('Home router pages renders without crashing', () => {
  const component = renderComponent()
  expect(component).toBeDefined();
});


it('Home router product list renders without crashing', () => {
  const history = createMemoryHistory()
  const component = render(
    <Router
      history={history}
      path="/items"
      exact={true}
      render={(props) => <ProductsList {...props} />}
    />
  )
  expect(component).toBeDefined();
});

it('Home router product detail renders without crashing', () => {
  const history = createMemoryHistory()
  const component = render(
    <Router
      history={history}
      path="/items"
      exact={true}
      render={(props) => <ProductDetail {...props} />}
    />
  )
  expect(component).toBeDefined();
});

