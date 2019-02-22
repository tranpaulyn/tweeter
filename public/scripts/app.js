/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//  Cross Site Scripting for extra encoding
function escape(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


// Create's front end elements for new tweets
$(function() {
    const createTweetElement = function(tweetData) {
        return `
            <article class="tweet">
                <header class="tweet-header">
                    <img class="tweet-avatar" alt="Tweeter User Avatar" src=${tweetData.user.avatars.small}>
                    <span class="username">${tweetData.user.name}</span>
                    <span class="tweet-handle">${tweetData.user.handle}</span>
                </header>
                <section class="main-tweet">
                    <p>${escape(tweetData.content.text)}</p>
                </section>
                <footer class="tweet-footer">
                    <span class="date">${new Date(tweetData.created_at).toLocaleString()}</span>
                    <span class="engagement">
                    <a class="engage-link" href="#"><img class="sm-engage" alt="Like" src="/images/like.png"></a>
                    <a class="engage-link" href="#"><img class="sm-engage" alt="Retweer" src="/images/retweet-arrows-symbol.png"></a>
                    <a class="engage-link" href="#"><img class="sm-engage" alt="Flag Tweet" src="/images/flag-black-shape.png"></a>
                    </span>
                </footer>
            </article>`
    }

    // Compose button appear, hide and focus
    $('.composeTweet').click(function() {
        $('.new-tweet').slideToggle("slide");
        $('#text').focus();
        // Hides errors for restarts
        $('#exceedChar').hide();
        $('#serverAlert').hide();
    })

    // Submit and prepend new tweet 
    $('#submitTweet').on('submit', function(event) {
        event.preventDefault();
        const data = $('#submitTweet').serialize();
        // Make sure tweet is within character limit
        if ($('.counter').html() >= 0) {
            $.post('/tweets/', data)
            .then((tweet) => {
                const elm = createTweetElement(tweet)
                $('.tweet-container').prepend(elm); 
                this.reset(); // Clears text area 
                $('.counter').html(140); // Reset Character Counter
                $('#serverAlert').hide(); // If alerts appeared, get rid of them 
                $('#exceedChar').hide();
                $('.counter').css('color', '#244751'); // If character counter turned red, reset it
            })
            .catch((err) => {
                console.log(err);
                if ($('#exceedChar').show()) {
                    $('#exceedChar').hide();
                };
                $('#serverAlert').show(); // Show server alert
            });
        } else {
            if ($('#serverAlert').show()) {
                $('#serverAlert').hide();
            }
            $('#exceedChar').show(); // Show character exceed alert 
        }
      });

      // Prepend tweets from the database 
      const loadTweets = function() {
          $.get('/tweets', function(tweets) {
            console.log(tweets);
            for (let content in tweets) {
                console.log(tweets[content]);
                const elm = createTweetElement(tweets[content]);
                $('.tweet-container').prepend(elm);
            }
        })
    }
    // Call function to prepend tweets
    loadTweets()

});