/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
    
    const tweetData = [];

    const createTweetElement = function(tweetData) {
        return `
            <article class="tweet">
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
            </article>
      `
    }

    function renderTweets(database) {
        for (let tweet in database) {
            $('.tweet-container').append(createTweetElement(database[tweet]));
        };
    }
    
    renderTweets(tweetData);

    $('#submitTweet').on('submit', function(event) {
        event.preventDefault();
        const $form = $('#submitTweet')
        const data = $form.serialize();
        console.log('tweet: ', data);
        $.post('/tweets/', data)
          .then((tweet) => {
              console.log("TWEET from server", tweet)
            const elm = createTweetElement(tweet)
            $('.tweet-container').prepend(elm); 
          })
          .catch((err) => {
            console.log(err);
            alert('Something went wrong, please try again!');
          });
          this.reset();
      });


      const loadTweets = $.get('/tweets', function(tweets) {
        console.log(tweets);
        for (let content in tweets) {
            console.log(tweets[content]);
            const elm = createTweetElement(tweets[content]);
            $('.tweet-container').append(elm);
        }
      })

});