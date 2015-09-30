<?php

 include('config.php');
 include('JWT.php');

		$post_data = file_get_contents("php://input");
		$data = json_decode($post_data);
		
		
		$username = $data->username;
		$password = $data->password;
		
		$mysql_select=mysql_query("SELECT * FROM formAngularAdmin where username='".$username."' && password='".$password."'");

$datalist = array();
while($rows = mysql_fetch_array($mysql_select))
{
	$datalist = array(
	"id" => $rows['id'],
	"username" =>$rows['username'],
	"password" => $rows['password']
	);
}

$num_rows = mysql_num_rows($mysql_select);
  if(isset($datalist) && !empty($datalist)){
		
		

		$tokenVer = base64_encode($username.":".$password).time();
		
		if($tokenVer)
		{
			$mysql_token=mysql_query("SELECT * FROM revoke_token where tokenVal ='".$tokenVer."'");
			$mysql_num= mysql_num_rows($mysql_token);
			
			if($mysql_num)
			{
				echo "tokenExpired";
			}
			else
			{
				echo base64_encode($username.":".$password).time();
				//echo header("Authorization: Basic " .base64_encode($username.":".$password));
			}
		}else
		{
			echo base64_encode($username.":".$password).time();
			//echo header("Authorization: Basic " .base64_encode($username.":".$password));
		}
  }
  else{
	echo 'error';
  }
  
?>