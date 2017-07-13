console.log("bot is working");

var botName = 'wildmetweetbot';

var Twit = require('twit');
var config = require('./config');
var sprintf = require('sprintf-js').sprintf;

var twitObj = new Twit(config);

var params = {
  q:'@' + botName,
  count: 10
};
// twitObj.get('search/tweets', params, onResult);

var baseTweetText = "Hi, @%1$s! Here's a random number for you: %2$s";
var randomNum = Math.floor(Math.random()*100);
var hashTagText = "#flukebot";
var name = "Joe";

// function onResult(err, data, response){
//   var tweets = data.statuses;
//   console.log(data.statuses.user);
//   for(var i = 0; i<tweets.length; i++){
//     var randomNum = Math.floor(Math.random()*100);
//     var name = tweets[i].user.screen_name;
//     tweetResponse(sprintf(baseTweetText, name, randomNum));  //TODO enable this if you want it to start tweeting
//   }
// }

var stream = twitObj.stream("user");
stream.on('tweet', tweetEvent);

function tweetEvent(event){
  var replyto = event.in_reply_to_screen_name;
  var text = event.text;
  var from = event.user.screen_name;
  var now = new Date();

  var fs = require('fs');
  var json  = JSON.stringify(event, null, 2);
  fs.writeFile("tweet" + now + "_" + from + ".json", json);

  if (from !== botName && replyto === botName){
    var newTweetTxt = "Hi, @" + from + "!";
    try{
      var mediaType = event.entities.media[0].type;
      var url = event.entities.media[0].media_url_https;
    } catch(e){
      console.log(e);
    }
    console.log("Is mediaType null?: " + mediaType===null);
    if(url && mediaType && mediaType==="photo"){
      console.log("got into here");
      newTweetTxt += "Thanks for the picture. We'll get back to you when we have a result."  + hashTagText;
      console.log(newTweetTxt.length);
    } else{
      newTweetTxt +=  "Thanks for tweeting me. " + hashTagText;
    }
    tweetResponse(newTweetTxt);
  }
}

function tweetResponse(response){
  var randomNum = Math.floor(Math.random()*100);
  var tweet = {
    status: response + " " + randomNum
  };
  twitObj.post('statuses/update', tweet, uponTweeted);
  function uponTweeted (err, data, response){
    if (err) {
      console.log("There was an error");
	  	console.log(err);
	  } else {
	    console.log("It worked!");
	  }
  }
}
