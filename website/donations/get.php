<?php
/**
* Donation information fetching utility
*
* @license GPLv3
* @copyright (c) 2014 Sayak Banerjee <sayakb@kde.org>
*/

include("simple_html_dom.php");

// Allow access from different domains
header('Access-Control-Allow-Origin: *');

// Get the campaign data
$dom = new simple_html_dom();
$dom->load_file("https://www.kde.org/fundraisers/randameetings2017/");

// For fundraisers with percentage
$content = $dom->find('.progress-bar', 0)->style;
$chunks = explode(' ', $content);
$percent = $chunks[1];
$percent = substr($percent, 0, -2);
$percent = floatval($percent);

// For fundraisers with current amount
$content = $dom->find('.current-amount', 0)->plaintext;
$current = substr($content, 6);

// Output the data in JSON format
$data = array(
    "pcnt" => $percent,
    "current" => $current
);

echo json_encode($data);

?>
