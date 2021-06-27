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
    isset($data->OrderId)
	&& isset($data->EmpId)
	&& isset($data->CustId)
	&& isset($data->OrderDate)
	&& isset($data->Descript)
    && !empty(trim($data->OrderId))
	&& !empty(trim($data->CustId))
	&& !empty(trim($data->OrderDate))
	&& !empty(trim($data->Descript))
) {
    $OrderId = mysqli_real_escape_string($db_connection, trim($data->OrderId));
    $EmpId = mysqli_real_escape_string($db_connection, trim($data->EmpId));
	$CustId = mysqli_real_escape_string($db_connection, trim($data->CustId));
	$OrderDate = mysqli_real_escape_string($db_connection, trim($data->OrderDate));
	$Descript = mysqli_real_escape_string($db_connection, trim($data->Descript));
    $insertdetails = mysqli_query($db_connection, "INSERT INTO `salesorder`(`OrderId`,`EmpId`,`CustId`,`OrderDate`,`Descript`) VALUES('$OrderId','$EmpId','$CustId','$OrderDate','$Descript')");
    if ($insertdetails) {
		echo json_encode(["success" => 1, "msg" => "details Inserted!"]);
    } else {
        echo json_encode(["success" => 0, "msg" => "details Not Inserted!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>