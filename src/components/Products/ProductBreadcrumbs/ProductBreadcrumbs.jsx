import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

/*
  This method will show a route of categories of a specific product, if we are showing
  a list of products the BE will send the breadcrumb of the categories with more
  results returned. A handler to search for a category when clicking on one will probably 
  be implemented in the future.
*/


export const ProductBreadcrumbs = ({
  route // The breadcrumb route as an array.
}) => {
  return (
    <div className="ui-breadcrumbs-container">
      {route.map((breadcrumb, index) => (
        <div
          key={index}
          className="ui-breadcrumbs-container__breadcrumbs__item"
        >
          <span>{breadcrumb.name}</span>
          {index < route.length - 1 && (
            <FontAwesomeIcon
              icon={faChevronRight}
              className="ui-breadcrumbs-container__breadcrumbs__item__next-item"
            />
          )}
        </div>
      ))}
    </div>
  );
};
