'use strict';

var request = require('request'),
    G_KEY   =  process.env.G_KEY,
    AA_KEY   =  process.env.AA_KEY,
    AlchemyAPI = require('alchemy-api'),
    alchemy = new AlchemyAPI(AA_KEY),
    cx      =  '014319405928501326465:_-rvvn__nr0';
    //googleSearch = new GoogleSearch({
    //});

exports.getResults = function(athleteName, req, res){
  console.log('gkey', G_KEY);
  console.log('akey', AA_KEY);
  request('https://www.googleapis.com/customsearch/v1?key=' + G_KEY + '&cx=' + cx + '&q=' + athleteName, function(err, response, body){
        if(err){res.send(err);}else{
          var links = [];
          body = JSON.parse(body);
          for(var i = 0; i < body.items.length; i++){
            links.push(body.items[i].link);
          }

          console.log('url', links[0]);
          alchemy.entities(links[0], {sentiment:1, outputMode:'json'}, function(err, alchemyResponse){
            if(err){res.send(err);}
            //console.log(Object.keys(alchemyResponse));
            //alchemyResponse = JSON.parse(alchemyResponse);

            res.send({data: alchemyResponse.entities});
          });
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
