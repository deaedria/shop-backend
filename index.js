require("dotenv").config();
require('newrelic');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { Routes } = require("./routes");

class App extends Routes{
  init() {
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
    });

    app.use(this.route());

    return app.listen(process.env.PORT, () => {
      try{
        console.log(
          `app listening at http://${process.env.HOST || "localhost"}:${process.env.PORT}`
        );
      }catch(error){
        throw error
      }
      
    });
  }

}

new App().init()

module.exports = App