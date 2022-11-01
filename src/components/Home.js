import $ from "jquery";
function Home() {

    setTimeout(function(){
        // $('#myTable').DataTable();
        document.getElementById('home_link').classList.add('active');
        document.getElementById('list_link').classList.remove('active');
    } ,500);
    function handleSubmit(e){
    
        e.preventDefault();
        document.getElementById('submit_btn').disaabled=true;
        var vehicle_number=document.getElementById('vehicle_number').value;
        var driver_name=document.getElementById('driver_name').value;
        var check_in_time=document.getElementById('check_in_time').value;
        var check_in_date=document.getElementById('check_in_date').value;

        var check_in_time_and_date=check_in_time+" "+check_in_date;

        var check_out_time=document.getElementById('check_out_time').value;
        var check_out_date=document.getElementById('check_out_date').value;

        var check_out_time_and_date=check_out_time+" "+check_out_date;

        $.ajax({
            url: "https://unique-facts.000webhostapp.com/garage_api/enter_details.php",
            type: 'POST',
            data: {
                'vehicle_number': vehicle_number,
                'driver_name': driver_name,
                'check_in_time_and_date': check_in_time_and_date,
                'check_out_time_and_date': check_out_time_and_date,
            },
            cache: false,
            success: function(data) {
                alert(data);
                console.log(data);
                document.getElementById('vehicle_number').value="";
                document.getElementById('driver_name').value="";
                document.getElementById('check_in_time').value="";
                document.getElementById('check_in_date').value="";
                document.getElementById('check_out_time').value="";
                document.getElementById('check_out_date').value="";
                document.getElementById('submit_btn').disaabled=false;
            },
            // Fail..
            error: function(error) {
                
                console.log(error);
                
                alert("Sorry some technical issue.");
            }
        });
    
        
    }
    return (
        <div className="container-fluid">
            <h1 className="text-center">Welcome to Garage Database</h1>
            <br /> <br />
            <div className="row">
          <div className="col-12 col-md-6 offset-md-3">
              <div className="form">
                  <form action="#" className="text-start" onSubmit={handleSubmit} method="post">
                    <div className="mb-3">
                      <label htmlFor="vehicle_number" className="form-label">Vehicle Number*</label>
                      <input type="text" id="vehicle_number" required className="form-control"  placeholder="" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="driver_name" className="form-label">Driver Name*</label>
                      <input type="text" id="driver_name" required className="form-control"  placeholder="" />
                    </div>

                    <div className="mb-3">
                      <div className="row">
                        <div className="col-12 col-md-6">
                            <label htmlFor="check_in_time" className="form-label">Checkin Time*</label>
                            <input type="time" required className="form-control" id="check_in_time" placeholder="" />
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="check_in_date" className="form-label">Checkin Date*</label>
                            <input type="date" required className="form-control" id="check_in_date" placeholder="" />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="row">
                        <div className="col-12 col-md-6">
                            <label htmlFor="check_out_time" className="form-label">Checkout Time*</label>
                            <input type="time" required className="form-control" id="check_out_time" placeholder="" />
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="check_out_date" className="form-label">Checkout Date*</label>
                            <input type="date" required className="form-control" id="check_out_date" placeholder="" />
                        </div>
                      </div>
                    </div>

                    <button type="submit" id="submit_btn" className="btn btn-primary">Submit</button>
                  </form>
              </div>
          </div>
        </div>
      </div>

    )
}
export default Home;
