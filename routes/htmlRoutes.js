var db = require("../models");

module.exports = function(app) {
  
  // Login Passport routes that we need to figure out how it works with our handlebars
  //
  //-------------------------------------------------------------
  // When the website loads... the homepage is displayed
  app.get("/", function(req, res) {

    res.render("index", {layout: 'main.handlebars'});
  });

};
