import React from "react";

/*
  This Method will recieve the a message and a variant as prop in order to show a proper
  message to inform the user neccesary data. Ex: Zero results while searching.
*/

export const AlertMessage = ({
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
