<?php

$url = urldecode(file_get_contents("php://input"));
$data = file_get_contents($url);
echo $data;


?>