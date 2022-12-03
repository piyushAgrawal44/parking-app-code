<?php
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');      
        include('./config.php');                   
        $stmt="SELECT id,vehicle_number,driver_name,check_in_time_and_date,check_out_time_and_date
        FROM `garage_table` WHERE deleted_at IS NULL";
        $sql=mysqli_prepare($conn, $stmt);

        
        $result=mysqli_stmt_execute($sql);
        if ($result){
                $data= mysqli_stmt_get_result($sql);
                $emparray[] =array();
                while ($row = mysqli_fetch_array($data)){
                    $emparray[] = $row;
                }

                mysqli_stmt_close($sql); 
                mysqli_close($conn); 
                http_response_code(200);
                echo json_encode($emparray);
        }
        else
        {
           
            $data = "Something went wrong.";
            mysqli_stmt_close($sql);
            mysqli_close($conn); 
            // header('Content-Type: application/json; charset=utf-8');
            http_response_code(500);
            echo json_encode($data);
        }
                                               
?>