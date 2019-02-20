/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
    
    const tweetData = [
        {
          "user": {
            "name": "Newton",
            "avatars": {
              "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
              "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
              "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
            },
            "handle": "@SirIsaac"
          },
          "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
          },
          "created_at": 1461116232227
        },
        {
          "user": {
            "name": "Descartes",
            "avatars": {
              "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
              "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
              "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
            },
            "handle": "@rd" },
          "content": {
            "text": "Je pense , donc je suis"
          },
          "created_at": 1461113959088
        },
        {
          "user": {
            "name": "Johann von Goethe",
            "avatars": {
              "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
              "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
              "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
            },
            "handle": "@johann49"
          },
          "content": {
            "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
          },
          "created_at": 1461113796368
        }
      ];

    const createTweetElement = function(tweetData) {
        return `
        <header class="tweet-header">
        <img class="tweet-avatar" alt="Tweeter User Avatar" src=${tweetData.user.avatars.small}>
        <span class="username">${tweetData.user.name}</span>
        <span class="tweet-handle">${tweetData.user.handle}</span>
      </header>
      <section class="main-tweet">
        <p>${tweetData.content.text}</p>
      </section>
      <footer class="tweet-footer">
        <span class="date">${tweetData.created_at}</span>
        <span class="engagement">
          <a class="engage-link" href="#"><img class="sm-engage" alt="Like" src="/images/like.png"></a>
          <a class="engage-link" href="#"><img class="sm-engage" alt="Retweer" src="/images/retweet-arrows-symbol.png"></a>
          <a class="engage-link" href="#"><img class="sm-engage" alt="Flag Tweet" src="/images/flag-black-shape.png"></a>
        </span>
      </footer>
      `
    }

    function renderTweets(database) {
        for (let tweet in database) {
            $('.tweet-container').append(createTweetElement(database[tweet]));
        };
    }
    
    renderTweets(tweetData);

});