import React from "react";

export const ProductNotFound = ({
   message = "",
   variant = "default"
  }) => {
  return  message && (
    <div className={`ui-not-found-page ui-not-found-page--${variant}`}>
      <p className={`ui-not-found-page--${variant}__text`}>
        { message }
      </p>
    </div>
  )
};
