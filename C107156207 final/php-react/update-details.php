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
    && isset($data->OrderId)
    && isset($data->EmpId)
	&& isset($data->CustId)
	&& isset($data->CustName)
	&& isset($data->OrderDate)
	&& isset($data->Descript)
    && !empty(trim($data->OrderId))
    && !empty(trim($data->EmpId))
	&& !empty(trim($data->CustId))
    && !empty(trim($data->CustName))
	&& !empty(trim($data->OrderDate))
	&& !empty(trim($data->Descript))
) {
    $OrderId = mysqli_real_escape_string($db_connection, trim($data->OrderId));
    $EmpId = mysqli_real_escape_string($db_connection, trim($data->EmpId));
	$CustId = mysqli_real_escape_string($db_connection, trim($data->CustId));
	$CustName = mysqli_real_escape_string($db_connection, trim($data->CustName));
	$OrderDate = mysqli_real_escape_string($db_connection, trim($data->OrderDate));
	$Descript = mysqli_real_escape_string($db_connection, trim($data->Descript));
    $updateDetails = mysqli_query($db_connection, "UPDATE `salesorder` SET  `CustId`='$CustId',`OrderDate`='$OrderDate',`Descript`='$Descript' WHERE `seq`='$data->seq'");
    if ($updateDetails) {
        echo json_encode(["success" => 1, "msg" => "Details Updated."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Details Not Updated!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>