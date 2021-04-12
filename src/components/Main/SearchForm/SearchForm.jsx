import React, { useEffect, useState } from "react";
import { constants } from "../../../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getLogoSrc } from "../../../utils/helpers"
import { Link } from "react-router-dom";
const logo = require('../../../assets/logo.png')

/*
  This method is the main navbar of the application, it will be always visible so it will
  be imported by all the components that the routes shows and allows us to search products
  and to be redirected to main page when clicking on the app logo.
*/

export const SearchForm = ({
  inputPlaceholder = constants.SEARCH.PLACEHOLDER_INPUT, 
  initialValue = "", // If we are coming for a previous search we inicialize this value.
  actionValue // If we are currently in a previous search we need to handle the form action.
}) => {
  const [searchValue, setSeachValue] = useState("");

  // Each time the input changes his value we store the value in the component state.
  const handleChangeValue = (event) => {
    event.preventDefault();
    setSeachValue(event.target.value);
  };

  // Initially setting the search value when the initial value is defined.
  useEffect(() => {
    setSeachValue(initialValue);
  }, [initialValue, setSeachValue]);

  return (
    <div className="ui-search">
      <form
        className="ui-search__form"
        action={actionValue || "items"}
        method="get"
      >
        <Link to={{ pathname: "/" }}>
          <img
            src={getLogoSrc(logo)}
            alt="logo"
            className="ui-search__form__logo"  />
        </Link>
        <div className="ui-search__form__input-container">
          <input
            className="ui-search__form__input-container__input"
            name={constants.MELI_WEB.SEARCH_QUERY_STRING} 
            placeholder={inputPlaceholder}
            onChange={handleChangeValue}
            value={searchValue}
          />
          <button
            type="submit"
            className="ui-search__form__input-container__submit"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </form>
    </div>
  );
};
