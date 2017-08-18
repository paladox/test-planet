$(function() {
    $.getJSON('https://planet.kde.org/donations/get.php', function(data) {
        $('#donation-current-amount').html(data.current);
        $('#donation-bar').css({
            'width': data.pcnt + '%',
            'background': 'rgb(68,132,242)'
        });
    });
});
