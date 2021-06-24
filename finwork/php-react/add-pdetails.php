<?php
// add-product.php is for inserting new users into the database.
// Method: POST - http://localhost/php-react/add-details.php
// Required Fields – pname --> ProdName, price --> UnitPrice pid-->ProdID cost-->Cost

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->orderid)
	&& isset($data->prodid)
    && isset($data->prodid)
	&& isset($data->qty)
	&& isset($data->discount)
    && !empty(trim($data->orderid))
    && !empty(trim($data->prodid))
	&& !empty(trim($data->qty))
	&& !empty(trim($data->discount))
) {
    $orderid = mysqli_real_escape_string($db_connection, trim($data->orderid));
    $prodid = mysqli_real_escape_string($db_connection, trim($data->prodid));
	$qty = mysqli_real_escape_string($db_connection, trim($data->qty));
	$discount = mysqli_real_escape_string($db_connection, trim($data->discount));
    $insertpdetails = mysqli_query($db_connection, "INSERT INTO `orderdetail`(`OrderId`,`ProdId`,`Qty`,`Discount`) VALUES('$orderid','$prodid','$qty','$discount')");
    if ($insertpdetails) {
		$seq=mysqli_insert_id($db_connection);
		echo json_encode(["success" => 1, "msg" => "details Inserted!" ,"seq"=>$seq]);
    } else {
        echo json_encode(["success" => 0, "msg" => "details Not Inserted!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>