import React, { useEffect, useState } from 'react';
import $ from "jquery";

function List() {
    
    function removeDetails(id){
        if(id){
            var answer=window.confirm("Are you sure !!");
            if (answer) {
                $.ajax({
                    url: "https://wodrsbattlegame.000webhostapp.com/backend_api_for_my_other_project/parking_app_api/remove_details.php",
                    type: 'POST',
                    data: {
                        'id': id,
                    },
                    cache: false,
                    success: function(data) {
                        
                        setdetails(details => details.filter((x)=>{
                            return x.id !== id;
                        }));
                        // you can also this as a challenge without page reload data removal...
                        
                        alert("Details removed successfully");
                        console.log(data);
                    },
                    // Fail..
                    error: function(error) {
                        
                        console.log(error);
                        
                        alert("Sorry some technical issue.");
                    }
                });
            }
        }
        else{
            alert("Something went wrong.");
            window.location.reload();
        }
    }

    function editDetails(id){
       
       
        var vehicle_number=document.getElementsByClassName('vehicle_number'+id)[0].innerText;
        var driver_name=document.getElementsByClassName('driver_name'+id)[0].innerText;
        var check_in_time_and_date=document.getElementsByClassName('check_in_time_and_date'+id)[0].innerText;       
        var check_out_time_and_date=document.getElementsByClassName('check_out_time_and_date'+id)[0].innerText;


        $('#row_id').val(id);
        $('#vehicle_number').val(vehicle_number);
        $('#driver_name').val(driver_name);
        $('#check_in_time_and_date').val(check_in_time_and_date);
        $('#check_out_time_and_date').val(check_out_time_and_date);
        $("#myEditModalButton").click();
    }

    function updateDetails(e){
        e.preventDefault();
        var myId=document.getElementById('row_id').value;
        var vehicle_number=document.getElementById('vehicle_number').value;
        var driver_name=document.getElementById('driver_name').value;
        var check_in_time_and_date=document.getElementById('check_in_time_and_date').value;
        var check_out_time_and_date=document.getElementById('check_out_time_and_date').value;
        $.ajax({
            url: "https://wodrsbattlegame.000webhostapp.com/backend_api_for_my_other_project/parking_app_api/update_details.php",
            type: 'POST',
            data: {
                'row_id':myId,
                'vehicle_number': vehicle_number,
                'driver_name': driver_name,
                'check_in_time_and_date': check_in_time_and_date,
                'check_out_time_and_date': check_out_time_and_date,
            },
            cache: false,
            success: function(data) {
                $('#close_btn_edit_form').click();
                
                document.getElementsByClassName('vehicle_number'+myId)[0].innerText=vehicle_number;
                document.getElementsByClassName('driver_name'+myId)[0].innerText=driver_name;
                document.getElementsByClassName('check_in_time_and_date'+myId)[0].innerText=check_in_time_and_date;
                document.getElementsByClassName('check_out_time_and_date'+myId)[0].innerText=check_out_time_and_date;
                alert(data);
            },
            error: function(error) {
                console.log(error);   
                alert("Sorry some technical issue.");
            }
        });
    }
    
    function showFullDetails(text){
        $('#text').text(text);
        $("#myModalButton").click();
    }
    const [details, setdetails] = useState([]);
    
    
    useEffect(() => {
        fetchRepo();
    }, []);

    async function fetchRepo() {
        await fetch("https://wodrsbattlegame.000webhostapp.com/backend_api_for_my_other_project/parking_app_api/get_details.php").then(res => res.json()).then(data => {
            setdetails(data);
        });
    }
    
    setTimeout(function(){
            // $('#myTable').DataTable(); 
            document.getElementById('home_link').classList.remove('active');
            document.getElementById('list_link').classList.add('active');
    } ,1500);
    
    return (
      <div className="container-fluid mt-5">
            <div className="card col-12 col-md-3 text-start" >
                <div className="card-body">
                    <h5 className="card-title">Total Vehicle</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{details.length-1}</h6>
                </div>
            </div>
            <h3 className="text-center mb-5 text-primary"><b>Vehicle Details</b></h3>
            <div className="table-responsive">
                <table className="table nowrap " id='myTable'>
                    <thead>
                        <tr>
                            <th scope="col">Sno</th>
                            <th scope="col">Vehicle Number</th>
                            <th scope="col">Driver Name</th>
                            <th scope="col">Checkin Time</th>
                            <th scope="col">Checkout Time</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                    {details.map((x, i) =>
                        x.id ?
                        <tr key={i}>
                            <th scope="row">{i}</th>
                            <td className={'manage_overflow text-truncate vehicle_number'+x.id} onClick={() => showFullDetails(x.vehicle_number)}>{x.vehicle_number}</td>
                            <td className={'manage_overflow text-truncate driver_name'+x.id} onClick={() => showFullDetails(x.driver_name)}>{x.driver_name}</td>
                            <td className={'manage_overflow text-truncate check_in_time_and_date'+x.id} onClick={() => showFullDetails(x.check_in_time_and_date)}>{x.check_in_time_and_date}</td>
                            <td className={'manage_overflow text-truncate check_out_time_and_date'+x.id} onClick={() => showFullDetails(x.check_out_time_and_date)}>{x.check_out_time_and_date}</td>
                            <td>
                                <button className='btn btn-outline-primary' style={{"margin":"3px"}} id={x.id} onClick={() => editDetails(x.id)}>
                                    Edit
                                </button>
                                <button className='btn btn-outline-danger' id={x.id} onClick={() => removeDetails(x.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        :""
                    
                    )}
                        
                    </tbody>
                </table>
            </div>
            <br /> <br />


            {/* Modal */}
        
            <button type="button" id="myModalButton" hidden className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
            Launch modal
            </button>
                
            <button type="button" id="myEditModalButton" hidden className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myEditModal">
            Launch modal
            </button>


            <div className="modal fade" tabIndex="-1" id='myModal'>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"> </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p id='text'>text goes here.</p>
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-primary">Save changes</button> 
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div> */}
                    </div>
                </div>
            </div>

            <div className="modal fade" tabIndex="-1" id='myEditModal'>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id='updateForm' onSubmit={(e)=>updateDetails(e)} >
                        <div className="modal-body text-start">
                            <input type="hidden" name='row_id' id='row_id' readOnly/>
                            <div className="mb-3">
                                <label htmlFor="vehicle_number" className='text-primary'><b>Vehicle Number</b><span className='text-danger'> *</span></label>
                                <input className='form-control' type="text" name='vehicle_number' id='vehicle_number' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="driver_name" className='text-primary'><b>Driver Name</b><span className='text-danger'> *</span></label>
                                <input className='form-control' type="text" name='driver_name' id='driver_name' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="check_in_time_and_date" className='text-primary'><b>Checkin Time</b><span className='text-danger'> *</span></label>
                                <input className='form-control' type="text" name='check_in_time_and_date' id='check_in_time_and_date' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="check_out_time_and_date" className='text-primary'><b>Checkout Time</b><span className='text-danger'> *</span></label>
                                <input className='form-control' type="text" name='check_out_time_and_date' id='check_out_time_and_date' />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit"  className="btn btn-primary">Save</button>
                            <button type="button" className="btn btn-secondary" id='close_btn_edit_form' data-bs-dismiss="modal">Close</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
      </div>

    );
}
  
export default List;
  