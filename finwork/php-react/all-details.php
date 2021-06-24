<?php
// all-details.php is to fetch all details that exist in the database.
// Method: GET - http://localhost/php-react/all-details.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

$alldetails = mysqli_query($db_connection, "SELECT salesorder.seq as seq,salesorder.OrderId as OrderId,EmpId as EmpId ,salesorder.CustId as CustId,customer.CustName as CustName ,OrderDate as OrderDate,Descript as Descript
										FROM salesorder,customer
										WHERE customer.CustId=salesorder.CustId;");
if (mysqli_num_rows($alldetails) > 0) {
    $all_details = mysqli_fetch_all($alldetails, MYSQLI_ASSOC);
    // json_encode([],JSON_UNESCAPED_UNICODE) 參數一定要加才會正確顯示中文
    echo json_encode(["success" => 1, "details" => $all_details], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["success" => 0]);
}
?>
