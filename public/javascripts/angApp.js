"use strict";


  var app = angular.module("myApp", ["chart.js"]);
  
  app.controller("mainCtrl", ["$scope", "stocks", "$http", function ($scope, stocks,$http) {
    $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                     'August', 'September', 'October', 'November', 'December'];
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
      var y = "0"+(x.getMonth() - 6);
      var xDay = x.getDay() < 10 ? "0" + x.getDay() : xDay;
      var date1 = x.getFullYear() + "-" + xMotnh + "-" + xDay;
      var date2 = x.getFullYear() + "-" + y + "-" + xDay;
      var url = "https://www.quandl.com/api/v3/datasets/WIKI/" + input + ".json?api_key=PKtdZ-7LH8AuwUhHdozR&start_date=" + date2 + "&end_date=" + date1;
      stocks.getStock(url, input);
      $scope.input = "";
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





