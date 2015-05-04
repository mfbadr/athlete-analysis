'use strict';
/*jshint node:true*/

var express = require('express'),
    cfenv = require('cfenv'),
    serveStatic = require('serve-static'),
    app = express();

// serve the files out of ./public as our main files
//app.use(express.static(__dirname + '/public'));
app.use(serveStatic(__dirname + '/../public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.listen(appEnv.port, appEnv.bind, function(){
  console.log('server starting on ' + appEnv.url);
});
