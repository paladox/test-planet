$(function() {
    $.getJSON('https://planetkde.org/donations/get.php', function(data) {
        $('#donation-bar').css({
            'width': data.pcnt + '%',
            'background': 'rgb(68,132,242)'
        });
    });
});
