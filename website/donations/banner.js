$(function() {
    $.getJSON('donations/get.php', function(data) {
        $('#donation-goal-amt').html(data.goal);
        $('#donation-bar').css('width', data.pcnt + '%');
    });
});
