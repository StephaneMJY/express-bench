var http = require('http'),
  async = require('async'),
  moment = require('moment');

var argv = require('yargs').argv;

var now, later;

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
  now = moment();
  async.parallel(query_functions, function(){
    later = moment();
    callback();
  }); 
}

main(function(){
  console.log('Test Completed');
  console.log('Took ' + moment(later.diff(now)).millisecond() + ' millisecond');
  process.exit(0)
});
