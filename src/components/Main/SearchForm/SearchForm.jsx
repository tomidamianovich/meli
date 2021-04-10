import React, { useEffect, useState } from "react";
import { constants } from "../../../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const SearchForm = ({
  inputPlaceholder = constants.SEARCH.PLACEHOLDER_INPUT,
  initialValue = "",
}) => {
  const [searchValue, setSeachValue] = useState("");
  const [actionValue, setActionValue] = useState("");

  const handleChangeValue = (event) => {
    event.preventDefault();
    setSeachValue(event.target.value);
  };

  useEffect(() => {
    setActionValue(`${window.location}${constants.MELI_WEB.ITEMS_PATH}`);
    setSeachValue(initialValue);
  }, []);

  return (
    <div className="ui-search">
      <form className="ui-search__form" action={actionValue} method="get">
        <a href="#" className="ui-search__form__logo" />
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
            disabled={searchValue === ""}
            className="ui-search__form__input-container__submit"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </form>
    </div>
  );
};
