import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import renderer from 'react-test-renderer';
import { SearchForm } from './SearchForm';
import { BrowserRouter } from "react-router-dom";
import { constants } from "../../../utils/constants"
import '@testing-library/jest-dom'

// Snapshot tests
it('SearchForm matches snapshot without props', () => {
  const component = renderer.create(
    <BrowserRouter>
      <SearchForm />
    </BrowserRouter>
  );
  const searchForm = component.toJSON();
  expect(searchForm).toMatchSnapshot();
});

// Snapshot tests with props
it('SearchForm matches snapshot with props', () => {
  const component = renderer.create(
    <BrowserRouter>
      <SearchForm 
        inputPlaceholder={constants.SEARCH.PLACEHOLDER_INPUT}
        initialValue={'Snapshot test'}
        actionValue={''}
        />
    </BrowserRouter>
  );
  const searchForm = component.toJSON();
  expect(searchForm).toMatchSnapshot();
});


// Tests DOM elements, classes and proper values

const renderComponent = (searchFormProps) => {
  const onSubmit = jest.fn();
  const fieldName = constants.MELI_WEB.SEARCH_QUERY_STRING;
  const renderProps = render(
    <BrowserRouter>
      <SearchForm {...searchFormProps} />
    </BrowserRouter>
  );
  const form = renderProps.getByTestId('search-form');
  const input = renderProps.getByRole('textbox');
  const submitButton = renderProps.getByRole('button');
  const link = renderProps.getByRole('link', {name: /logo/i});

  return {
    ...renderProps,
    onSubmit,
    fieldName,
    form,
    input,
    submitButton,
    link
  };
};


it('SearchForm renders without crashing', () => {
  const component = renderComponent({
    inputPlaceholder: constants.SEARCH.PLACEHOLDER_INPUT,
    initialValue: 'Snapshot test',
    actionValue: ''
  });
  expect(component).toBeDefined();
});

it('SearchForm renders with the correct initial state', () => {
  const component = renderComponent({
    inputPlaceholder: constants.SEARCH.PLACEHOLDER_INPUT,
    initialValue: 'Initial Value test'
  });
  const { input, submitButton, onSubmit } = component
  expect(input).toBeDefined();
  // Testing initial value props working
  expect(input.value).toBe('Initial Value test')
  // Testing type of input value
  expect(input.type).toBe('text')
  // Testing class of search form
  expect(input).toHaveClass('ui-search__form__input-container__input')
  // Testing placeholder value working as expected
  expect(input).toHaveAttribute('placeholder', constants.SEARCH.PLACEHOLDER_INPUT)

  // Testing changes in input value
  fireEvent.change(input, { target: { value: 'Remera' } })
  expect(input.value).toBe('Remera')

  fireEvent.change(input, { target: { value: 'Reposera' } })
  expect(input.value).toBe('Reposera')

  fireEvent.change(input, { target: { value: 'Bicicleta' } })
  expect(input.value).toBe('Bicicleta')

  fireEvent.change(input, { target: { value: '' } })
  expect(input.value).toBe('')
});


it('SearchForm has the logo that redirect you to /', () => {
  const component = renderComponent({
    inputPlaceholder: constants.SEARCH.PLACEHOLDER_INPUT,
    initialValue: 'Initial Value test'
  });
  const { link } = component
  expect(link).toBeDefined();
  // Testing initial value props working
  expect(link.href).toBe(constants.APP_URL.PATH + "/")
});