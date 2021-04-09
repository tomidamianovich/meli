const express = require("express");
const path = require("path");
const https = require("https");
const ssrViewHandler = require('./utils/ssrViewHandler');
const {
  getProductDetailHandler,
  getProductListHandler
} = require('./utils/responseToJsonHandler');
var constants = require('./utils/constants');

/*
  This module is out main backend module. 
  
  It is used to handle the meli APIs and using
  other modules as "getProductDetailHandler and "getProductListHandler" to structure 
  the data in the json structure required by the UI.

  Also with this we will be handling server side rending with react with the helps of the
  "ssrViewHandler" module.
*/

// create express application
const app = express();

// serve static assets
app.get(
  /\.(js|css|map|ico)$/,
  express.static(path.resolve(__dirname, "../dist"))
);

/*
 API called when we go to location+/api/items, in our app we will be using this
 to search via a querysting parameter called "search". THe result of this endpoint
 is all the products that match the search.
 
 GET items by search query. 
*/
app.get("/api/items", (req, res) => {
  if (!("search" in req.query)) {
    res.status(404).send(err);
    res.end();
    return
  }
  const apiName = constants.MELI_API_URLS.QUERY + req.query.search;
  https.get(apiName, resp => {
    let data = "";
    // A chunk of data has been received.
    resp.on("data", (chunk) => data += chunk);
    // The whole response has been received. Response with the data parsed
    resp.on("end", () => res.status(200).send(getProductListHandler(data)));
  })
  .on("error", (err) => res.status(404).send(err));
});

/*
 API called when we go to location+/api/items/ID, in our app we will be using this
 to search via id params a specific product with that id. The result of this endpoint
 is the products that matchs the id provided.

 GET items by Id. 
*/
app.get("/api/items/:id", function (req, res) {
  const apiName = constants.MELI_API_URLS.ITEMS;
  var urls = [
    `${apiName}${req.params.id}`,
    `${apiName}${req.params.id}${constants.MELI_API_URLS.DESCRIPTION}`,
  ];
  var responses = [];
  var completed_requests = 0;
  urls.forEach(currentUrl => {
    https.get(currentUrl, function (resp) {
      let data = "";
      // A chunk of data has been received.
      resp.on("data", (chunk) => data += chunk);
      // The whole response has been received. Response with the data parsed
      resp.on("end", () => {
          responses = [...responses, JSON.parse(data)];
          completed_requests++;
          if (completed_requests !== urls.length) return
          const itemResponse = responses.findIndex((item) => item.id);
          // If the item id wasnt found, return 404
          if (itemResponse < 0) {
            res.status(404).send(responses[0]);
            res.end();
            return;
          }
          // We retrieve path_from_root from categories endpoint to show breadcrumbs 

          https.get(`https://api.mercadolibre.com/categories/${responses[itemResponse].category_id}`, function (resp) {
            let newData = "";
            // A chunk of data has been received.
            resp.on("data", (chunk) => newData += chunk);
            resp.on("end", () => {
              let categoryResponse = JSON.parse(newData)
              // If ItemResponse is 0 means that plain text is in the other response
              const { plain_text } = responses[itemResponse === 0 ? 1 : 0];
              res.status(200).json(getProductDetailHandler(responses[itemResponse], plain_text, categoryResponse));
              res.end();
            })
          })
        })
        .on("error", (err) => res.status(404).send(err));
    });
  })
});

/*
  Used for server side rendering when we want to see the information of an specific product,
  in the client application this will be showing the products/ProductDetail.jsx component
  with the data fetched using the endpoint below.
*/
app.use("/items/:id", async (req, res) => {
  const { originalUrl, params } = req
  if (!params || !(constants.MELI_API_URLS.PARAMS.ID in params)) {
    res.status(404).send('error');
    res.end();
    return
  } 
  // set header and status
  res.contentType("text/html");
  res.status(200);
  const appBaseUrl = `${req.protocol}://${req.headers.host}`
  return res.send(await ssrViewHandler(originalUrl, params.id, appBaseUrl));
});


/*
  Used for server side rendering when we want to see the information of a list of products
  that matchs a query passed via query strings. In the client application this will be 
  showing the products/ProductList.jsx component with the data fetched using the endpoint below.

  This will be triggered when the user using the search components triggers a submit event
  so we will search for results and showing info in the ui that matchs that query here.
*/
app.use("/items", async (req, res) => {
  // If search is not part of the query string params return not found.
  if (!(constants.MELI_API_URLS.PARAMS.SEARCH in req.query)) {
    res.status(404).send('error');
    res.end();
    return
  } 
  // Removing querystrings params in order to match 'ProductsList' component inside ssrViewHandler
  const exactUrl = req.originalUrl.includes(constants.MELI_API_URLS.PARAMS.QUERY_STRING_SEARCH)
    ? req.originalUrl.split("?")[0]
    : req.originalUrl

  // set header and status
  res.contentType("text/html");
  res.status(200);
  const appBaseUrl = `${req.protocol}://${req.headers.host}`
  return res.send(await ssrViewHandler(exactUrl, req.query.search, appBaseUrl));
});

/* For any other request we will be sending an `index.html` as a response. */
app.use("*", async (req, res) => {
  res.contentType("text/html");
  res.status(200);
  return res.send(await ssrViewHandler(req.originalUrl));
});

// run express server on port 9000
app.listen("9000", () => {
  console.log("Express server started at port 9000");
});
