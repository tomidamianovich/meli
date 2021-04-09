import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// import Home components
import { Home } from "./components/Main/Home";

/*
  We get the BrowserRouter component from "react-router-dom" that should wrap the uppermost 
  component inside which different components would be rendered using the Switch and Route
  components.

  We are going to wrap Home component with the BrowserRouter inside src/index.dev.js
  as well as src/index.prod.js.

  For hydration (utilizing the HTML rendered on the server for a component), we need
  to use ReactDOM.hydrate() function. So we can reuse the HTML rendered on the server-side
  and ask React to simply use this HTML for the Home component. 
  
  React then will only attach event listeners to existing DOM elements.

  The ReactDOM.render() function does not perform hydration but replaces the entire HTML tree 
  by rendering the component from the scratch. 

*/ 
ReactDOM.hydrate(
  <BrowserRouter>
    <Home />
  </BrowserRouter>,
  document.getElementById("home")
);
