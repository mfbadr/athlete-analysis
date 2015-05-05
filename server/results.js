'use strict';

var request = require('request'),
    async = require('async'),
    G_KEY   =  process.env.G_KEY,
    AA_KEY   =  process.env.AA_KEY,
    AlchemyAPI = require('alchemy-api'),
    alchemy = new AlchemyAPI(AA_KEY),
    cx      =  '014319405928501326465:_-rvvn__nr0';

//oooooh my god this feels so hacky
AlchemyAPI.prototype.target = function(data, options, cb){
  this._doRequest(this._getQuery(data, options, 'GetTargetedSentiment'), cb);
};

exports.getResults = function(athleteName, req, res){
  request('https://www.googleapis.com/customsearch/v1?key=' + G_KEY + '&cx=' + cx + '&q=' + athleteName, function(err, response, body){
        if(err){res.send(err);}else{
          var links = [];
          body = JSON.parse(body);
          for(var i = 0; i < body.items.length; i++){
            links.push(body.items[i].link);
          }

          var getTargettedSentiment = function(link, cb){
            alchemy.target(link, {target:athleteName, outputMode:'json'}, function(err, alchemyResponse){
              delete alchemyResponse.usage;
              cb(err, alchemyResponse);
            });
          };

          async.map(links, getTargettedSentiment, function(err, finalResponse){
            res.send({data: finalResponse});
          });
            /*
          alchemy.target(links[0], {target:athleteName, outputMode:'json'}, function(err, alchemyResponse){
            if(err){res.send(err);}
            res.send({data: alchemyResponse});
          });
          */
        }
  });
};


  //GET https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures
//'/url/URLGetRankedNamedEntities'
/*
function getEntities(url) {
  alchemyapi.entities('url', URL,{ 'sentiment':1 }, function(response) {
    output['entities'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['entities'] };
    keywords(req, res, output);
  });
}
*/
