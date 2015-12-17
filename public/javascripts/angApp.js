"use strict";


  var app = angular.module("myApp", ["chart.js"]);
  
  app.controller("mainCtrl", ["$scope", "stocks", "$http", function ($scope, stocks,$http) {
    $scope.labelsRef = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July',
                     'Aug', 'Sept', 'Octo', 'Nov', 'Dec'];
    $scope.labels = [];
     var date = new Date();
      var dday = date.getDate();
      var dmonth = date.getMonth() -1;
      for(var x=0; x<30; x++){
        if(dday > 30){ dday = 0; dmonth +=1;}
        dday += 1;
        $scope.labels.push(dday.toString() + "-" + $scope.labelsRef[dmonth]);
    }
    
      $scope.series = stocks.datas.series;
      // $scope.data = [
      //   [65, 59, 80, 81, 56, 55, 40],
      //   [28, 48, 40, 19, 86, 27, 90],
      //   [28, 48, 40, 19, 86, 27, 90],
      //   [28, 48, 40, 19, 2, 27, 90]
      // ];
      $scope.data = stocks.datas.data;
      $scope.test = stocks.test;
    $scope.findData = function(input){
      var x = x = new Date();
      var xMotnh = x.getMonth() < 10 ? "0" +x.getMonth() : x.getMonth();
      var y = x.getMonth() - 1 < 10 ? "0" + (x.getMonth() -1) : x.getMonth() -1;
      var xDay = x.getDay() < 10 ? "0" + x.getDay() : xDay;
      var date1 = x.getFullYear() + "-" + xMotnh + "-" + xDay;
      var date2 = x.getFullYear() + "-" + y + "-" + xDay;
      var url = "https://www.quandl.com/api/v3/datasets/WIKI/" + input + ".json?api_key=PKtdZ-7LH8AuwUhHdozR&start_date=" + date2 + "&end_date=" + date1;
      stocks.getStock(url, input);
      $scope.input = "";
    };
    
    $scope.delete = function (ind) {
      stocks.datas.series.splice(ind,1);
      stocks.datas.data.splice(ind,1);
    };
    
  }]);
  
  app.factory('stocks',  ['$http', function($http) {
    var x = { datas: { series: [], data: [] } };
    
    x.getStock = function(url, input) {
        $http.get(url)
            .success(function(rd) {
              var series = input;
              var a = [];
              rd.dataset.data.forEach(function (obj) {
                a.push(obj[1]);
              })
              x.datas.series.push(series);
              x.datas.data.push(a);
        });
      };
        
    return x;
  }]);





