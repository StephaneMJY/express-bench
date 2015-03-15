var gulp = require('gulp'),
  http = require('http'),
  q = require('q'),
  curl = require('curlrequest'),
  async = require('async');

var argv = require('yargs').argv;

var request_count,
  completed_count = 0;
if (!argv.requests || isNaN(Number(argv.requests))) {
  request_count = 20;
} else {
  request_count = argv.requests;
}

var query = function(callback){
  http.get('http://localhost:3000/', function (response) {
    response.on('data', function() {
      console.log('Completed');
    });
    callback();
  }).on('error', function (e) {
    console.log("Got error: " + e.message);
  });
}

var main = function(callback){
  var query_functions = [];
  for (var i = 0; i < request_count; i++){
    query_functions.push(query);
  };
  console.log('Processing ' + request_count + ' requests');
  async.parallel(query_functions, function(){
    callback();
  }); 
}

main(function(){
  console.log('Test Completed');
  process.exit(0)
});
