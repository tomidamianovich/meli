const express = require("express");
const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { StaticRouter, matchPath } = require("react-router-dom");

/*
  This module is used for import the Main "Home" component and received an HTML string
  from it that it would render in the browser. Then we are populating the #home element 
  with this string.
*/

// create express application
const app = express();

// import Home component
const { Home } = require("../../src/components/Main/Home");

// import routes
const routes = require("../routes");
const constants = require("./constants");

async function ssrViewHandler (urlToMatch, fetchDataParam, appBaseUrl)  {
  /* 
    Get matched route between routes declared in the server side and the one 
    created in the client side with react-router. The server/routes.js exports
    an array of objects and each object contains the route path and the component
    which will be rendered inside Home component based on the route path. 
    We import this array inside server/server.js and find out
    which component was rendered using the matchPath() function provided by the 
    react-router-dom.
  */
  const matchRoute = routes.find((route) => matchPath(urlToMatch, route));

  // Initially the data of the component is set to null
  let componentData = null;
  // fetch data of the matched component
  if (matchRoute && typeof matchRoute.component.fetchData === "function") {
    componentData = fetchDataParam
      ? await matchRoute.component.fetchData(fetchDataParam, appBaseUrl)
      : await matchRoute.component.fetchData()
  }

  // Getting the read `index.html` file
  let indexHTML = fs.readFileSync(
    path.resolve(__dirname, "../../dist/index.html"),
    {
      encoding: "utf8",
    }
  );

  
  /*
    In the client side we will be using BrowserRouter that will be all the time listening 
    to URLs changes in order to render the proper component (depending on the route-path).

    As BrowserRouter can not work on the server because the server it’s not a browser and
    there is not URL to listen to we need to manually provide the route path so that Home 
    component can pick the correct component to render. For this, we need to use the 
    StaticRouter component that accepts the location prop which should be the URL path.
    
    We can use req.originalUrl value received in the Express route handler as the value 
    of location prop.
  */

  /* 
    Getting the HTML string from the `Home` component (Main component)
    Using the context prop, we can pass the fetched data to the component which was
    rendered by the router. In the components we are avoiding to fetch data on the client-side 
    if the data was already provided by the server.
  */
  let appHTML = ReactDOMServer.renderToString(
    <StaticRouter location={urlToMatch} context={componentData}>
      <Home />
    </StaticRouter>
  );

  console.log(componentData)

  /* After Getting the HTML string from the `Home` component (Main component) we are
    Populating `#home` element (our react main div) with `appHTML` in order that 
    search engines crawlers could use it */
  indexHTML = indexHTML.replace(
    '<div id="home"></div>',
    `<div id="home">${appHTML}</div>`
  );

  /* Adding author meta data value to the html */
  if (componentData && constants.AUTHOR.KEY in componentData) {
    const { name, lastname } = componentData.author
    const metaAuthorContent = JSON.stringify(`${name} ${lastname}`)
    indexHTML = indexHTML.replace(
      '<meta name="author" content=""/>',
      `<meta name="author" content=${metaAuthorContent}/>`
    );
  }

  /* Setting value of `initial_state` global variable, this will be used among the 
    components to handle the data coming from the endpoints */
  indexHTML = indexHTML.replace(
    "var initial_state = null;",
    `var initial_state = ${JSON.stringify(componentData)};`
  );
  

  /* Returning the indexHTML with the html and initial_state to the express module,
  this will be the response in that module send with type "text/html"  */
  return indexHTML
}

module.exports = ssrViewHandler