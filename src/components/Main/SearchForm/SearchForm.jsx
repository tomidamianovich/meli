import React, {useEffect, useState} from "react";
import { constants } from '../../../utils/constants'

export const SearchForm = ({ inputPlaceholder }) => {
  const [searchValue, setSeachValue] = useState('')
  const [actionValue, setActionValue] = useState('')

  const handleChangeValue = (event) => {
    event.preventDefault()
    setSeachValue(event.target.value)
  }

  useEffect(() => {
    setActionValue(`${window.location}${constants.MELI_WEB.ITEMS_PATH}`)
  }, [])

  return (
    <div className="ui-search">
      <p className="ui-search__title">Search Form Page</p>
      <div className="ui-search__body">
        <form action={actionValue} method="get">
          <input
            name={constants.MELI_WEB.SEARCH_QUERY_STRING}
            placeholder={inputPlaceholder}
            onChange={handleChangeValue}
            value={searchValue}
          />
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
