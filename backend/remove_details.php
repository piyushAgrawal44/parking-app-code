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
        
    if(isset($_POST['id']) && !empty($_POST['id']))
    {
        include('./config.php');;
        
        $id=check_input($_POST['id']);
        $stmt="UPDATE `garage_table` SET deleted_at=? WHERE id=(?)";
        $sql=mysqli_prepare($conn, $stmt);

        //binding the parameters to prepard statement
        $timestamp=date('Y-m-d H:i:s');
        mysqli_stmt_bind_param($sql,"si",$timestamp,$id);
        $result=mysqli_stmt_execute($sql);
        if($result)
        {
            mysqli_stmt_close($sql); 
            mysqli_close($conn); 
            $data = "Successfully data deleted.";
            // header('Content-Type: application/json; charset=utf-8');
             http_response_code(200);
            echo json_encode($data);
        } 
        else
        {
           
            $data ="Something went wrong.";
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