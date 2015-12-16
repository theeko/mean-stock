var express = require('express');
var router = express.Router();
var Quad = require("../api/quandl");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/data/:stockname", function(req, response, next) {
  var quad = new Quad();
    console.log("before ajax");
    quad.apiReq(req.params.stockname,function (err, res, body){
      if(err){ return err; }
      response.send("asd");
      console.log("after ajax");
    });
    
  });

module.exports = router;
