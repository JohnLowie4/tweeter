/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1623708961391
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];

/**
 * 
 */
$(document).ready(function () {
  
  /**
   * A cross-site scripting function
   * @param {String} str 
   * @returns String
   */
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  /**
   * Renders tweets saved in data onto the webpage
   * @param {Array} tweets 
   */
  const renderTweets = function (tweets) {
    // Empties the body of the tweet container
    $("#tweets-container").empty();
    // Reverse array to post the newest tweet at the top
    tweets.reverse();
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      let $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweet);
    }
  };

  /**
   * Creates an html template from the data in tweet and returns it to caller
   * @param {Object} tweet 
   * @returns an html template literal
   */
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
          <p>${escape(content["text"])}</p>
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

  /**
   * Loads all the tweets on server
   */
  const loadtweets = function() {
    $.ajax("/tweets")
      .then(function(results) {
        console.log(results);
        renderTweets(results);
      });
  };

  /**
   * Submits a post request to server
   */
  $('.tweet-box').submit(function (event) {
    // Prevents the default submit to execute
    event.preventDefault();

    const $newTweet = $(".tweet-box").serialize();
    const textChecker = $('#tweet-text').val().length;

    // Checks if user submitted valid inputs
    if (textChecker === 0) {
      alert("There is nothing to tweet");
    } else if (textChecker > 140) {
      alert("Your tweet is too long");
    } else if (textChecker > 0 && textChecker <= 140) {
      $.post("/tweets", $newTweet)
        .then(function () {
          $('#tweet-text').val(''); // Empties the textarea
          $(".counter").val(140); // Resets the number of available characters
          loadtweets();
        });
    }
  });

  // Loads up the inital tweets in server
  loadtweets();
});