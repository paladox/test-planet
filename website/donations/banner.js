$(function() {
    $.getJSON('http://planetkde.org/donations/get.php', function(data) {
        $('#donation-goal-amt').html(data.goal);
        $('#donation-bar').css('width', data.pcnt + '%');
    });
});
