<?php
/**
* Pledgie donation information fetching utility
*
* @args Pass the campaign ID to fetch
* @license GPLv3
* @copyright (c) 2012 Sayak Banerjee <sayakb@kde.org>
*/

include("simple_html_dom.php");

// Collect the campaign information
$campaign = $_GET["campaign"];

if (empty($campaign)) {
    die("Pass campaign ID as get_predges.php?campaign=123");
}

// Get the campaign data
$dom = new simple_html_dom();
$dom->load_file("http://pledgie.com/campaigns/{$campaign}");

$goal = $dom->find(".progressCounter li.last", 0)->plaintext;
$goal = str_replace(".", "", $goal);
$goal = str_replace(",", ".", $goal);

$pcnt = $dom->find(".progressCounter .bar", 0)->style;
$pcnt = str_replace("width:", "", $pcnt);
$pcnt = str_replace("%;", "", $pcnt);

// Output the data in JSON format
$data = array(
    "goal" => $goal,
    "pcnt" => $pcnt,
);

echo json_encode($data);
exit;

?>