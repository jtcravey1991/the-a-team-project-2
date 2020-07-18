let jokeLogChart = document.getElementById("jokeChart").getContext("2d");

getJoke(); 
//Global options
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";

let jokeChart = new Chart(jokeLogChart, {
    type: "bar",
    data: {
        labels: [],
        datasets: [{
            label: "Joke",
            data: [],
            backgroundColor: "Purple", 
            hoverBackgroundColor: "MediumPurple", 
            barThickness: 75      
  
        }]
    },
    options: {
        title: {
            display: true,
            text: "Joke Tracker",
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


$("#jokeBtn").on("click", function (e){
    e.preventDefault(); 
    addJoke();
}); 

function addJoke(){
    let inputDate = moment().format(); 
    console.log(inputDate); 
    let dayDate = moment(inputDate).format('MMMM Do YYYY');
    $("#dateDisplay").text(dayDate);
    
    
    jokeValue = 1; 
    jokeChart.data.datasets[0].data.push(jokeValue);

    jokeChart.data.labels.push(dayDate);
  //want to push dayDate as value to backend
  document.getElementById("jokeProgress").innerHTML = "Always nice to make others smile, keep it up!"
   
  jokeChart.update();

  const newJoke = {
    date: inputDate,
    value: jokeValue
  };
  // Send the POST request.
  $.ajax("/api/joke", {
    type: "POST",
    data: newJoke
  }).then(data => {
    console.log(data);
    console.log("logged joke");

  });
}
function getJoke() {
    $.get("/api/joke", function(data) {
    
       //array that takes in the data values to populate the chart
    for (let i = 0; i < data.length; i++) {
  
      jokeChart.data.datasets[0].data.push(data[i].value);
  
      data[i].date = moment(data[i].date).format("ddd, MMMM Do")
      jokeChart.data.labels.push(data[i].date);
  
  };
    jokeChart.update(); 
    
    });
  };