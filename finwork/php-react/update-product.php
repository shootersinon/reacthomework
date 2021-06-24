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
    isset($data->pid)
    && isset($data->pname)
    && isset($data->price)
    && !empty(trim($data->pname))
    && !empty(trim($data->price))
	&& !empty(trim($data->cost))
    && !empty(trim($data->cost))
) {
    $pname = mysqli_real_escape_string($db_connection, trim($data->pname));
    $price = mysqli_real_escape_string($db_connection, trim($data->price));
	$cost = mysqli_real_escape_string($db_connection, trim($data->cost));
    $updateProduct = mysqli_query($db_connection, "UPDATE `product` SET `ProdName`='$pname', `Unitprice`='$price' ,`Cost`='$cost' WHERE `ProdId`='$data->pid'");
    if ($updateProduct) {
        echo json_encode(["success" => 1, "msg" => "Product Updated."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Product Not Updated!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>