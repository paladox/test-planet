$(function() {
    $.getJSON('https://planetkde.org/donations/get.php', function(data) {
        $('#donation-goal-amt').html(data.goal);
        $('#donation-bar').css({
            'width': data.pcnt + '%',
            'background': 'rgb(68,132,242)'
        });
    });
});
