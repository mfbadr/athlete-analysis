'use strict';
/*jshint node:true*/

var express = require('express'),
    cfenv = require('cfenv'),
    morgan = require('morgan'),
    serveStatic = require('serve-static'),
    bodyParser = require('body-parser'),
    results = require('./results'),
    app = express();

app.use(serveStatic(__dirname + '/../public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.route('/results')
  .post(function(req, res){
    //res.send(req.body);
    results.getResults(req.body.athleteName, req, res);
  });


app.listen(appEnv.port, appEnv.bind, function(){
  console.log('server starting on ' + appEnv.url);
});
