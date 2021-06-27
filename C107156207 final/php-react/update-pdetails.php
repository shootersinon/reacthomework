<?php
// update-product.php is for updating an existing user.
// Method: POST - http://localhost/php-react/update-product.php
// Required Fields: pid --> ProdId, pname --> ProdName, price --> UnitPrice

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (
	isset($data->seq)
	&& isset($data->qty)
	&& isset($data->discount)
	&& !empty(trim($data->qty))
    && !empty(trim($data->discount))

) {
	$qty = mysqli_real_escape_string($db_connection, trim($data->qty));
	$discount = mysqli_real_escape_string($db_connection, trim($data->discount));
    $updatepdetails = mysqli_query($db_connection, "UPDATE `orderdetail` SET  `Qty`='$qty',`Discount`='$discount' WHERE `seq`='$data->seq'");
    if ($updatepdetails) {
        echo json_encode(["success" => 1, "msg" => "Details Updated."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Details Not Updated!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>