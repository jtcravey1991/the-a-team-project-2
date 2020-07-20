const hugLogChart = document.getElementById("hugChart").getContext("2d");

getHug(); 

//Global options
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";

const hugChart = new Chart(hugLogChart, {

  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "Hug",
        data: [],
        backgroundColor: "Thistle",
        hoverBackgroundColor: "MediumPurple",
        barThickness: 75
      }
    ]
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
      } //tooltips can be enabled:true or false
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 1,
            stepSize: 1
          }
        }
      ]
    }
  }
});

$("#hugBtn").on("click", e => {
  e.preventDefault();
  addHug();
});


function addHug(){
 
    let inputDate = moment().utc().format(); 
    let hugDate = moment(inputDate).utc().format("ddd, MMMM Do");
    $("#hugDisplayDate").text(hugDate);
 
    let hugValue = 1;
  
  hugChart.data.datasets[0].data.push(hugValue);

  hugChart.data.labels.push(hugDate);
  //want to push dayDate as value to backend
  document.getElementById("hugProgress").innerHTML =
    "Great hug! Keep those endorphins going!";


  hugChart.update();

  const newHug = {
    date: inputDate,
    value: hugValue
  };
  // Send the POST request.
  $.ajax("/api/hug", {
    type: "POST",
    data: newHug
  }).then(data => {
    console.log(data);
    console.log("logged hug");
    location.reload(); 
  });
};

function getHug() {

    $.get("/api/hug", function(data) {
        const dataSet = [data];
        console.log(dataSet); 

        const mappedData = data.reduce((last, date) =>{
          const temp = {};
          temp[date.date] = last[date.date] ? last[date.date] + date.value : date.value;
          return {...last, ...temp};
        }, {}); 
      const chartData = Object.keys(mappedData).map(k => ({date: k, value: mappedData[k]}));
      console.log(chartData); 

      const hugData = [];

      if(chartData.length<= 7){
          for (let i = 0; i < chartData.length; i++) {
            chartData.sort(function(a,b){
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return new Date(b.date) - new Date(a.date);
            });
            
            hugData.push(chartData[i]); 
            
          };
        }
        else if(chartData.length >7){
          for (let i = 0; i < 7; i++) {
            chartData.sort(function(a,b){
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return new Date(b.date) - new Date(a.date);
            });
            
            hugData.push(chartData[i]); 
            
          };
        };
       
        hugData.reverse(); 

    
       //array that takes in the data values to populate the chart
    for (let i = 0; i < hugData.length; i++) {
  
      hugChart.data.datasets[0].data.push(hugData[i].value);
  
      hugData[i].date = moment(hugData[i].date).format("ddd, MMMM Do")
      hugChart.data.labels.push(hugData[i].date);
     
      hugChart.data.datasets[0].data.push(hugData[hugData.length -1].value);
      document.getElementById("hugProgress").innerHTML = "Great hug! Keep those endorphins going!"
     
  };
    hugChart.update(); 
    
    });
}; 
