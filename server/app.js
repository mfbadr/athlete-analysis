'use strict';
/*jshint node:true*/

var express = require('express'),
    cfenv = require('cfenv'),
    morgan = require('morgan'),
    serveStatic = require('serve-static'),
    bodyParser = require('body-parser'),
    app = express();

// serve the files out of ./public as our main files
//app.use(express.static(__dirname + '/public'));
app.use(serveStatic(__dirname + '/../public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.route('/results')
  .post(function(req, res){
    res.send(req.body);
  });


app.listen(appEnv.port, appEnv.bind, function(){
  console.log('server starting on ' + appEnv.url);
});
