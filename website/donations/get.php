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
$dom->load_file("https://www.kde.org/fundraisers/yearend2017/");

// For fundraisers with percentage
$content = $dom->find('.progress-value', 0)->plaintext;
$content = trim($content);
$percent = substr($content, 0, strpos($content, "%"));
$percent = floatval($percent);

// For fundraisers with current amount
$content = $dom->find('.text__blue', 0)->plaintext;
$content = substr($content, strpos($content, "Raised:"));
$content = substr($content, 8);
$content = str_replace(",", "", $content);
$current = substr($content, 0, strpos($content, " "));

// Output the data in JSON format
$data = array(
    "pcnt" => $percent,
    "current" => $current
);

echo json_encode($data);

?>
