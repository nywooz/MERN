// Import the express package
const express = require("express");
// execute the express package
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv/config");

// Middlewares
app.use(cors());
// everytime a request is made, run bodyParser
app.use(bodyParser.json());

// import Routes
const postsRoute = require("./routes/todos");

// Middleware-Function that execute when this route is being hit
app.use("/posts", postsRoute);

// ROUTES
// get: gets a message
app.get("/", (req, res) => {
  console.log("Home page");
  res.send("<h1>We are on home</h1>");
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("connected to DB!")
);

var postsModel = mongoose.model("Test", new mongoose.Schema({ name: String }));
console.log("sdsfs " + postsModel);
/**
 * RESTful Services - https://www.restapitutorial.com/lessons/httpmethods.html
 *
 * 
 * 
HTTP Verb	Operation
GET	Read
POST	Create
PUT	Update
DELETE	Delete

 * POST - Create a member resource in the collection resource using the instructions in the request body. The URI of the created member resource is automatically assigned and returned in the response Location header field.
 *
 * GET - Retrieve the URIs of the member resources of the collection resource in the response body.
 *
 * PUT - 	Replace all the representations of the member resources of the collection resource with the representation in the request body, or create the collection resource if it does not exist.
 *
 * PATCH - Update all the representations of the member resources of the collection resource using the instructions in the request body, or may create the collection resource if it does not exist.
 *
 * DELETE - Delete all the representations of the member resources of the collection resource.
 */

//How to start listenning to the server
app.listen(3000);

// sandbox code
/**
 * 
 * 
 * 
 * 
  
 
 fetch("http://localhost:3000/posts")
  .then(result => {
    console.log(result.json());
  })
  .then(data => {
    console.log(data);
  }); 



  
 * 
 */
