import React, { useEffect, useState } from "react";
import { constants } from "../../../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getLogoSrc } from "../../../utils/helpers"
import { Link } from "react-router-dom";
const logo = require('../../../assets/logo.png')

export const SearchForm = ({
  inputPlaceholder = constants.SEARCH.PLACEHOLDER_INPUT,
  initialValue = "",
  actionValue
}) => {
  const [searchValue, setSeachValue] = useState("");

  const handleChangeValue = (event) => {
    event.preventDefault();
    setSeachValue(event.target.value);
  };

  useEffect(() => {
    setSeachValue(initialValue);
  }, [initialValue, constants, setSeachValue]);

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
