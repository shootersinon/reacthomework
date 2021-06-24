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

$allpdetails = mysqli_query($db_connection, "SELECT seq as seq , OrderId as orderid,product.ProdId as prodid,product.ProdName as prodnamd ,Qty as qty, Discount as discount
												FROM `orderdetail`,product
												WHERE orderdetail.ProdId=product.ProdID;");
if (mysqli_num_rows($allpdetails) > 0) {
    $all_pdetails = mysqli_fetch_all($allpdetails, MYSQLI_ASSOC);
    // json_encode([],JSON_UNESCAPED_UNICODE) 參數一定要加才會正確顯示中文
    echo json_encode(["success" => 1, "pdetails" => $all_pdetails], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["success" => 0]);
}
?>
