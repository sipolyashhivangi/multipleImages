<?php
$servername='172.16.10.22';
$username='sampatti';
$password='clsdir';
$conn=mysql_connect($servername, $username, $password);
$dtbs=mysql_select_db('db_emp1638',$conn)or die("error");

		$post_date = file_get_contents("php://input");
		$data = json_decode($post_date);

		$name= $data->name;
		$username= $data->userName;
		$password=$data->password;
		$cpassword=$data->cpassword;
		$email=$data->email;
		$contactno =$data->contactno;
		$country= $data->country->displayName;
		$state =$data->state->displayName;
		$city =$data->city->displayName;
		$fileImg=$data->file;
		$path=$data->path;
		$time=time();
function saveImage($base64img){
global $fileImg, $time;
    define('UPLOAD_DIR', '/mnt/backup/home/ssipolya/public_html/Angular Js/programs/curdByShivangi/img/');
	var_dump($base64img);
    $base64img = str_replace('data:image/jpeg;base64,', '', $base64img);

	$base64img = explode(',', $base64img);
	$base64img = $base64img[1];

print_r($base64img);
    $data = base64_decode($base64img);
	
	foreach($fileImg as $fileImg1)
	{  
		var_dump($fileImg1);
		
		$file = UPLOAD_DIR .$time.'_'.$fileImg1;
		file_put_contents($file, $data);
	}
}

		
		saveImage($path);
							
		echo $ImgVal= $time.'_'.implode(',',$fileImg);
		// $image=$data->image;
	
		$sql ="insert into forPracticalNg (name, username, password, cpassword,email,contactno, country,state,city, image) values('".$name."','".$username."','".$password."','".$cpassword."','".$email."','".$contactno."','".$country."','".$state."','".$city."','".$ImgVal."')";
			$qry_res =mysql_query($sql, $conn);
			

?>