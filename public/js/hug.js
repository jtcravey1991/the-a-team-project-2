let hugLogChart = document.getElementById("hugChart").getContext("2d");

getHug(); 
//Global options
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";

let hugChart = new Chart(hugLogChart, {
    type: "bar",
    data: {
        labels: [],
        datasets: [{
            label: "Hug",
            data: [],
            backgroundColor: "Thistle", 
            hoverBackgroundColor: "MediumPurple", 
            barThickness: 75      
  
        }]
    },
    options: {
        title: {
            display: true,
            text: "Hug Tracker",
            fontSize: 25
        },
        legend: {
            //display, font options as well in labels object
            //position: "right"
        },
        layout: {
            padding: {
                left: 50,
                right: 0,
                bottom: 0,
                top: 0
            }//tooltips can be enabled:true or false
        },
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 1,
                    stepSize: 1
                }
            }]
        }
    }
});


$("#hugBtn").on("click", function (e){
    e.preventDefault(); 
    addHug();
}); 

function addHug(){
    let hugDate = moment().format('MMMM Do YYYY');
    $("#hugDisplayDate").text(hugDate);
    
    hugValue = 1; 
    hugChart.data.datasets[0].data.push(hugValue);

    hugChart.data.labels.push(hugDate);
  //want to push dayDate as value to backend
  document.getElementById("hugProgress").innerHTML = "Great hug! Keep those endorphins going!"
   
  hugChart.update();

  const newHug = {
    date: hugDate,
    value: hugValue
  };
  // Send the POST request.
  $.ajax("/api/hug", {
    type: "POST",
    data: newHug
  }).then(data => {
    console.log(data);
    console.log("logged hug");

  });
}
function getHug() {
    $.get("/api/hug", function(data) {
    
       //array that takes in the data values to populate the chart
    for (let i = 0; i < data.length; i++) {
  
      hugChart.data.datasets[0].data.push(data[i].value);
  
      data[i].date = moment(data[i].date).format("ddd, MMMM Do")
      hugChart.data.labels.push(data[i].date);
  
  };
    hugChart.update(); 
    
    });
  };