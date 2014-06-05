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
$dom->load_file("http://www.kde.org/fundraisers/randameetings2014/");

$content = $dom->find('.formholder p', 0)->plaintext;
$chunks = explode(' ', $content);
$goal = $chunks[0];
$goal = floatval(substr($goal, 3));

// Output the data in JSON format
$data = array(
    "goal" => $goal,
    "pcnt" => $goal / 200,
);

echo json_encode($data);
exit;

?>
