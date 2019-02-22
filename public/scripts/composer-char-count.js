// This script helps to count characters, and update character count in real time
// This script also changes the char count to red.

$(document).ready(function() {

    var textMax = 140;
    $('.counter').html(textMax);

    $('textarea').keyup(function() {
        var textLength = $('textarea').val().length;
        var textRemaining = textMax - textLength;

        if (textRemaining <= 0 ) {
            $('.counter').css('color', 'red');
        } else if (textRemaining > 0) {
            $('.counter').css('color', '#244751')
        }

        $('.counter').html(textRemaining);
    });
});


