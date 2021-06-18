/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
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
    $('.error-message').empty();

    // Error messages to be displayed
    const $error1 = $(`
      <span>
        <i class="fas fa-exclamation-triangle"></i>
          <p>Sorry, but there is nothing to tweet.</p>
        <i class="fas fa-exclamation-triangle"></i>
      </span>
    `);

    const $error2 = $(`
      <span>
        <i class="fas fa-exclamation-triangle"></i>
          <p>Sorry, your tweet is too long. Please keep your tweet at 140 characters or less.</p>
        <i class="fas fa-exclamation-triangle"></i>
      </span>
    `);

    const $newTweet = $(".tweet-box").serialize();
    const textChecker = $('#tweet-text').val().length;

    // Checks if user submitted valid inputs
    if (textChecker === 0) {
      $('.error-message').append($error1);
    } else if (textChecker > 140) {
      $('.error-message').append($error2);
    } else if (textChecker > 0 && textChecker <= 140) {
      $('.error-message').empty();
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