$(function() {
    var campaign = $('#pledgie-banner').attr('data-campaign');
    
    $.getJSON('pledgie/get_pledges.php?campaign=' + campaign, function(data) {
        $('#pledgie-goal-amt').html(data.goal);
        $('#pledgie-bar').css('width', data.pcnt + '%');
    });
});