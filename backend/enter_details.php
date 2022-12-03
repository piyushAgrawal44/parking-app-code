<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400'); 

    function check_input($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        $data=ucwords($data);
        if ($data=="" || $data==null) {
            $data="Not Avilable";
        }
        return $data;
    }
        
    if(isset($_POST['vehicle_number']) && !empty($_POST['vehicle_number']) && isset($_POST['driver_name']) 
    && !empty($_POST['driver_name']) && isset($_POST['check_in_time_and_date']) && !empty($_POST['check_in_time_and_date'])
    && isset($_POST['check_out_time_and_date']) && !empty($_POST['check_out_time_and_date']))
    {
        include('./config.php');
        
        $vehicle_number=check_input($_POST['vehicle_number']);
        $driver_name=check_input($_POST['driver_name']);
        $check_in_time_and_date=check_input($_POST["check_in_time_and_date"]);
        $check_out_time_and_date=check_input($_POST["check_out_time_and_date"]);
       
        $stmt="INSERT INTO `garage_table` (vehicle_number,driver_name,check_in_time_and_date,check_out_time_and_date) VALUES (?,?,?,?)";
        $sql = mysqli_prepare($conn, $stmt);
        mysqli_stmt_bind_param($sql, 'ssss', $vehicle_number,$driver_name,$check_in_time_and_date,$check_out_time_and_date);
        $result=mysqli_stmt_execute($sql);
        if($result)
        {
            mysqli_stmt_close($sql); 
            mysqli_close($conn);
            $data = "Successfully data inserted.";
            // header('Content-Type: application/json; charset=utf-8');
             http_response_code(200);
            echo json_encode($data);
        } 
        else
        {
           
            $data = mysqli_error($conn);
            // header('Content-Type: application/json; charset=utf-8');
             mysqli_stmt_close($sql);
             mysqli_close($conn);
            http_response_code(500);
            echo json_encode($data);
        }
    }
    else{
        $data = "Please fill all the details";
        
        // header('Content-Type: application/json; charset=utf-8');
        http_response_code(500);
        echo json_encode($data);
    }
?>