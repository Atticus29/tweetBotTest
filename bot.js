console.log("bot is working");

var Twit = require('twit');
var config = require('./config');
var sprintf = require('sprintf-js').sprintf;

var twitObj = new Twit(config);

var params = {
  q:'@wildmetweetbot',
  count: 10
};
twitObj.get('search/tweets', params, onResult);

var baseTweetText = "Hi, %1$s! Here's a random number for you: %2$s";
var randomNum = Math.floor(Math.random()*100);
var hashTagText = "#flukebot";
var name = "Joe";

function onResult(err, data, response){
  var tweets = data.statuses;
  // console.log(data.statuses.user);
  for(var i = 0; i<tweets.length; i++){
    var randomNum = Math.floor(Math.random()*100);
    var name = tweets[i].user.screen_name;
    tweetResponse(sprintf(baseTweetText, name, randomNum));
  }
}




console.log(sprintf(baseTweetText, name, randomNum));

// tweetResponse(sprintf(baseTweetText, name));


function tweetResponse(response){
  var tweet = {
    status: response
  };
  twitObj.post('statuses/update', tweet, uponTweeted);
  function uponTweeted (err, data, response){
    if (err) {
	  	console.log("Something went wwrong!");
	  } else {
	    console.log("It worked!");
	  }
  }
}
