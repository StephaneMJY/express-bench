var express = require('express'),
  enrouten = require('express-enrouten');

var app = express();

app.use(enrouten({
    directory: 'controllers',
    index: 'controllers/index.js'
}));

server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Node.js listening at http://%s:%s', host, port);

});