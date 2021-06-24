<?php
// add-product.php is for inserting new users into the database.
// Method: POST - http://localhost/php-react/add-product.php
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
    isset($data->pname)
    && isset($data->price)
	&& isset($data->pid)
	&& isset($data->cost)
    && !empty(trim($data->pname))
    && !empty(trim($data->price))
	&& !empty(trim($data->pid))
    && !empty(trim($data->cost))
) {
    $pname = mysqli_real_escape_string($db_connection, trim($data->pname));
    $price = mysqli_real_escape_string($db_connection, trim($data->price));
	$pid = mysqli_real_escape_string($db_connection, trim($data->pid));
	$cost = mysqli_real_escape_string($db_connection, trim($data->cost));
    $insertProduct = mysqli_query($db_connection, "INSERT INTO `product`(`ProdName`,`UnitPrice`,`ProdID`,`Cost`) VALUES('$pname','$price','$pid','$cost')");
    if ($insertProduct) {
		echo json_encode(["success" => 1, "msg" => "product Inserted!"]);
    } else {
        echo json_encode(["success" => 0, "msg" => "product Not Inserted!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>