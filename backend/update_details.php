<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');      
      
    if(isset($_POST['row_id']) && !empty($_POST['row_id']) && isset($_POST['name']) && !empty($_POST['name']) && isset($_POST['nick_name']) && !empty($_POST['nick_name']) && isset($_POST['school_name']) && !empty($_POST['school_name']))
    {
        include('./config.php');
        $stmt="UPDATE `garage_table` SET vehicle_number=?,driver_name=?,check_in_time_and_date=?,check_out_time_and_date=? WHERE id=(?)";
        $sql=mysqli_prepare($conn, $stmt);

        //binding the parameters to prepard statement
        mysqli_stmt_bind_param($sql,"ssssi",$vehicle_number,$driver_name,$check_in_time_and_date,$check_out_time_and_date,$row_id);

        $row_id=trim_input_value($_POST['row_id']);
        $vehicle_number=trim_input_value($_POST['vehicle_number']);
        $driver_name=trim_input_value($_POST['driver_name']);
        $check_in_time_and_date=trim_input_value($_POST['check_in_time_and_date']);
        $check_out_time_and_date=trim_input_value($_POST['check_out_time_and_date']);

        $result=mysqli_stmt_execute($sql);
        if($result)
        {
            mysqli_stmt_close($sql); 
            mysqli_close($conn);
            $data = "Successfully updated...";
            // header('Content-Type: application/json; charset=utf-8');
            http_response_code(200);
            echo json_encode($data);
        } 
        else
        {    
            $data = "Something went wrong.";
            // header('Content-Type: application/json; charset=utf-8');
            mysqli_stmt_close($sql);
            mysqli_close($conn);
            http_response_code(500);
            echo json_encode($data);
        }

    } else {
            $data = "Please enter all the details...";
            // header('Content-Type: application/json; charset=utf-8');
            http_response_code(200);
            echo json_encode($data);
    }
    

        
    function trim_input_value($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        $data=ucwords($data);
        return $data;
    }
?>