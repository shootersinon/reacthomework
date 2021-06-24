<?php
// delete-product.php is for deleting an existing user.
// Method: POST - http://localhost/php-react/delete-product  .php
// Required Fields: pid --> ProdId

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->OrderId)) {
    $delID = $data->OrderId;
    $deleteDetails = mysqli_query($db_connection, "DELETE FROM `salesorder` WHERE `OrderId`='$delID'");
    if ($deleteDetails) {
        echo json_encode(["success" => 1, "msg" => "Details Deleted"]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Details Not Found!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Product Not Found!"]);
}
?>