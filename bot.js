console.log("bot is working");

var Twit = require('twit');
var config = require('./config');

var twitObj = new Twit(config);

var params = {
  q:'@wildmetweetbot',
  count: 10
};
twitObj.get('search/tweets', params, onResult);

function onResult(err, data, response){
  var tweets = data.statuses;
  // console.log(tweets);
  for(var i = 0; i<tweets.length; i++){
    console.log(tweets[i].text);
  }
}
