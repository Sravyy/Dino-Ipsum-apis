(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

$(document).ready(function () {
  $('#searchBike').submit(function (event) {
    $("#result").text("");
    event.preventDefault();
    var title = $('.title').val();
    var location = $('.location').val();
    $('.title').val("");
    $('.location').val("");

    var promise = new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      var url = "https://bikeindex.org/api/v3/search?page=1&per_page=25&manufacturer=" + title + "&location=" + location + "&stolenness=stolen";
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function (response) {
      var body = JSON.parse(response);
      body.bikes.forEach(function (bike) {
        // date in UNIX timestamp(formula to convert is =(((givenNumber)/60)/60)/24)+DATE(1970,1,1);
        if (bike.date_stolen >= 1511308800 && bike.date_stolen <= 1511848800) {
          $('#result').append("Bike ID: " + bike.id + "<br>" + ("Bike title: " + bike.title) + "<br>");
        }
      });
    }, function (error) {
      $('.showErrors').text("There was an error processing your request: " + error.message);
    });
  });
});

},{}]},{},[1]);
