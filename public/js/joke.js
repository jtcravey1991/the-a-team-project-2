let jokeLogChart = document.getElementById("jokeChart").getContext("2d");

getJoke(); 
//Global options
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";

const jokeChart = new Chart(jokeLogChart, {
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
            position: "top"
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
    let inputDate = moment({h:0, m:0, s:0, ms:0}).utc().format(); 
  
    let dayDate = moment(inputDate).utc().format("ddd, MMMM Do");
    $("#dateDisplay").text(dayDate);
    
    let jokeValue = 1; 
    
    jokeChart.data.datasets[0].data.push(jokeValue);
    jokeChart.data.labels.push(dayDate);

   
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
    location.reload(); 

  });
}
function getJoke() {
    $.get("/api/joke", function(data) {
    
  const dataSet = [data];
  console.log(dataSet);
  const mappedData = data.reduce((last, date) =>{
  const temp = {};
  temp[date.date] = last[date.date] ? last[date.date] + date.value : date.value;
      return {...last, ...temp};
    }, {}); 
  const chartData = Object.keys(mappedData).map(k => ({date: k, value: mappedData[k]}));
  console.log(chartData); 


  const jokeData = [];

      if(chartData.length<= 7){
          for (let i = 0; i < chartData.length; i++) {
            chartData.sort(function(a,b){
             
              return new Date(b.date) - new Date(a.date);
            });
            
            jokeData.push(chartData[i]); 
            
          };
        }
        else if(chartData.length >7){
          for (let i = 0; i < 7; i++) {
            chartData.sort(function(a,b){
            
              return new Date(b.date) - new Date(a.date);
            });
            
            jokeData.push(chartData[i]); 
            
          };
        };
       
        jokeData.reverse(); 
 
    for (let i = 0; i < jokeData.length; i++) {
  
      jokeChart.data.datasets[0].data.push(jokeData[i].value);
  
      jokeData[i].date = moment(jokeData[i].date).utc().format("ddd, MMMM Do")
      jokeChart.data.labels.push(jokeData[i].date);
     
      document.getElementById("jokeProgress").innerHTML = "Always nice to make others smile, keep it up!"
  
  };
    jokeChart.update(); 
    
    });
  };