var request = require("request");

function quad(){
  this.apiReq = function(search, callback){
    var x = x = new Date();
    var xMotnh = x.getMonth() < 10 ? "0" +x.getMonth() : x.getMonth();
    var y = "0"+(x.getMonth() - 6);
    var xDay = x.getDay() < 10 ? "0" + x.getDay() : xDay;
    var date1 = x.getFullYear() + "-" + xMotnh + "-" + xDay;
    var date2 = x.getFullYear() + "-" + y + "-" + xDay;
    var url = "https://www.quandl.com/api/v3/datasets/WIKI/" + search + ".json?start_date=" + date2 + "&end_date=" + date1;
    request(url, function (err, res, body) {
      return callback(err, res, body);
    });
  };
}

module.exports = quad;