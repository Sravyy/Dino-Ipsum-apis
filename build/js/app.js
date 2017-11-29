(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {
  $('#dinoButton').click(function (event) {
    $('#result').text("");
    event.preventDefault();
    var paragraph = $('.paragraph').val();
    var words = $('.words').val();
    $('.paragraph').val("");
    $('.words').val("");

    var promise = new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      var url = 'http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=' + paragraph + '&words=' + words;
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
      body.forEach(function (sentence) {
        sentence.forEach(function (word) {
          $('#result').append(word + " ");
        });
        $('#result').append("<br>");
      });
    }, function (error) {
      $('.showErrors').text('There was an error processing your request: ' + error.message);
    });
  });
});

},{}]},{},[1]);
