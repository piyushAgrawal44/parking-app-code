import $ from "jquery";
import React from 'react';
// var BarChart = require("react-chartjs").Bar;

function Home() {
  

  // var chartData={
  //   labels: ['Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  //   datasets: [{
  //       label: 'Number Vehicle Every Day',
  //       data: [12, 19, 3, 5, 2, 3, 8],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //         'rgba(255, 205, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(201, 203, 207, 0.2)'
  //       ],
  //       borderColor: [
  //         'rgb(255, 99, 132)',
  //         'rgb(255, 159, 64)',
  //         'rgb(255, 205, 86)',
  //         'rgb(75, 192, 192)',
  //         'rgb(54, 162, 235)',
  //         'rgb(153, 102, 255)',
  //         'rgb(201, 203, 207)'
  //       ],
  //       // borderWidth: 1
  //   }]};
    
  //   var chartOptions={
  //     scales: {
  //       y: {
  //           beginAtZero: true
  //       }
  //   }
  //   }
  setTimeout(function () {
    // $('#myTable').DataTable();
    document.getElementById('home_link').classList.add('active');
    document.getElementById('list_link').classList.remove('active');
  }, 500);
  function handleSubmit(e) {

    e.preventDefault();
    document.getElementById('submit_btn').disaabled = true;
    var vehicle_number = document.getElementById('vehicle_number').value;
    var driver_name = document.getElementById('driver_name').value;
    var check_in_time = document.getElementById('check_in_time').value;
    var check_in_date = document.getElementById('check_in_date').value;

    var check_in_time_and_date = check_in_time + " " + check_in_date;

    var check_out_time = document.getElementById('check_out_time').value;
    var check_out_date = document.getElementById('check_out_date').value;

    var check_out_time_and_date = check_out_time + " " + check_out_date;

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
      success: function (data) {
        alert(data);
        console.log(data);
        document.getElementById('vehicle_number').value = "";
        document.getElementById('driver_name').value = "";
        document.getElementById('check_in_time').value = "";
        document.getElementById('check_in_date').value = "";
        document.getElementById('check_out_time').value = "";
        document.getElementById('check_out_date').value = "";
        document.getElementById('submit_btn').disaabled = false;
      },
      // Fail..
      error: function (error) {

        console.log(error);

        alert("Sorry some technical issue.");
      }
    });


  }

  // const [details, setdetails] = useState([]);
    
    
  //   useEffect(() => {
  //       fetchRepo();
  //   }, []);

  //   async function fetchRepo() {
  //       await fetch("https://unique-facts.000webhostapp.com/garage_api/get_details.php").then(res => res.json()).then(data => {
  //         setdetails(data);
  //       });
  //   }
    // var today= new Date();


    // fetchRepo();
  return (
    <div className="container-fluid">
      <div className="">
          <h1 className="text-center">Welcome to Parking App</h1>
      </div>
      <br /> <br /><br />
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3 bg_img">
          <h4 className="text-center">Add New Vehicle</h4>
          <div className="form">
            <form action="#" className="text-start" onSubmit={handleSubmit} method="post">
              <div className="mb-3">
                <label htmlFor="vehicle_number" className="form-label">Vehicle Number*</label>
                <input type="text" id="vehicle_number" required className="form-control" placeholder="" />
              </div>
              <div className="mb-3">
                <label htmlFor="driver_name" className="form-label">Driver Name*</label>
                <input type="text" id="driver_name" required className="form-control" placeholder="" />
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

             <div className="text-center">
             <button type="submit" id="submit_btn" className="btn btn-primary">Submit</button>
             </div>
            </form>
          </div>
        </div>
        {/* <div className="col-12 col-md-6 padding_10px">
            <h4 className="text-center">This Week</h4>
            
            <div className="manage_overflow">
              <BarChart data={chartData} options={chartOptions} className="" width="600" height="350"/>
            </div>
        </div> */}
      </div>
    </div>

  )
}
export default Home;
