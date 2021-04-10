import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const ProductBreadcrumbs = ({
  route
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
