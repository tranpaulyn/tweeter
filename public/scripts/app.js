/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }



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

    $('.composeTweet').click(function() {
        $('.new-tweet').slideToggle("slide");
        $('#text').focus();
    })


    $('#submitTweet').on('submit', function(event) {
        event.preventDefault();
        const $form = $('#submitTweet');
        const data = $form.serialize();
        if ($('.counter').html() >= 0) {
            $.post('/tweets/', data)
            .then((tweet) => {
                const elm = createTweetElement(tweet)
                $('.tweet-container').prepend(elm); 
                this.reset();
                $('.counter').html(140);
                $('#serverAlert').hide();
                $('#exceedChar').hide();
                $('.counter').css('color', '#244751')
            })
            .catch((err) => {
                console.log(err);
                $('#serverAlert').show();
            });
        } else {
            $('#exceedChar').show();
        }
      });


      const loadTweets = function() {
          $.get('/tweets', function(tweets) {
            console.log(tweets);
            for (let content in tweets) {
                console.log(tweets[content]);
                const elm = createTweetElement(tweets[content]);
                $('.tweet-container').append(elm);
            }
        })
    }

    loadTweets()

});