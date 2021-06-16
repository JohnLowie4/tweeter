/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1623708961391
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

$(document).ready(function () {

  const renderTweets = function (tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      let $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      console.log($tweet);
      $('#tweets-container').append($tweet);
    }
  };

  const createTweetElement = function (tweet) {
    const user = tweet["user"];
    const content = tweet["content"];
    const time = timeago.format(tweet["created_at"]);
    let $tweet = $(`
      <div class="tweet-body">
        <div class="tweet-header">
          <div class="avatar-name">
            <img class="avatar" src=${user["avatars"]}>
            <h4 class="name">${user["name"]}</h4>
          </div>
          <div class="handle">
            <h4>${user["handle"]}</h4>
          </div>
        </div>
        <div class="tweet-content">
          <p>${content["text"]}</p>
        </div>
        <div class="tweet-footer">
          <div class="time"><span class="need_to_be_rendered">${time}</span></div>
          <div class="tweet-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </div>
      </div>

  `);

    return $tweet;
  };

renderTweets(data);
});