<?php
	include('config.php');

	$Tokenvalget = file_get_contents("php://input");
	$dataToken = json_decode($Tokenvalget);
	// print_r($dataToken);
	
	// var_dump($dataToken->token);
	$tokenVal = $dataToken->token;
	$response = "Successful logout";
	$sql ="insert into `db_emp1638`.`revoke_token` (tokenVal) values('" . $tokenVal . "')";
	// print_r($sql);
	$qry_res = mysql_query($sql, $conn);
	header("Content-Type", "application/json");
	$resp = array(
		"msg" => "Successfully logged out.",
		"code" => 200
	);
	echo json_encode($resp);
	
?>