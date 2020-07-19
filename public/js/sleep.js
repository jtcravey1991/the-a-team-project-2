const sleepLogChart = document.getElementById("myChart").getContext("2d");

const sleepTime = document.querySelector("#sleepBtn");

let sleepGoal = 8;
getSleep();

//Global options
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";

const sleepChart = new Chart(sleepLogChart, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "Sleep Hours Per Night",
        data: [],
        backgroundColor: "CornflowerBlue",
        hoverBackgroundColor: "LightBlue"  ,
        barThickness: 50   
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: "Sleep Tracker",
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
            max: sleepGoal + 2,
            stepSize: 1
          }
        }
      ]
    }
  }
});

sleepTime.addEventListener("click", () => {
  event.preventDefault();
  addSleep();
});

function addSleep() {
  let inputDate = document.getElementById("startOne").value;
  
  let logDate = moment(inputDate).utc().format("ddd, MMMM Do");
  

  sleepGoal = "8";

  sleepHours = document.getElementById("sleepLog").value;

  sleepChart.data.datasets[0].data.push(sleepHours);

  sleepChart.data.labels.push(logDate);

  document.getElementById("sleepHoursGoal").innerHTML =
    "You've set a goal for " + sleepGoal + " hours per night";

  sleepChart.update();


  const newSleep = {
    date: inputDate,
    value: sleepHours
  };
  // Send the POST request.
  $.ajax("/api/sleep", {
    type: "POST",
    data: newSleep
  }).then(data => {
    console.log(data);
    console.log("logged sleep");
    location.reload(); 
  });

};

function getSleep() {
  $.get("/api/sleep", function(data) {
  

    const dataSet = [data];
    console.log(dataSet); 
    const mappedData = data.reduce((last, date) =>{
      const temp = {};
      temp[date.date] = last[date.date] ? last[date.date] + date.value : date.value;
      return {...last, ...temp};
    }, {}); 
  const chartData = Object.keys(mappedData).map(k => ({date: k, value: mappedData[k]}));
  console.log(chartData); 
     //array that takes in the data values to populate the chart
  for (let i = 0; i < chartData.length; i++) {

    sleepChart.data.datasets[0].data.push(chartData[i].value);

    chartData[i].date = moment(chartData[i].date).utc().format("ddd, MMMM Do")
    sleepChart.data.labels.push(chartData[i].date);

    if (chartData[chartData.length -1].value < sleepGoal) {
      document.getElementById("sleepProgress").innerHTML = "You need more sleep!";
    } else {
      document.getElementById("sleepProgress").innerHTML =
        "You must feel well rested!";
    }
};


sleepChart.update(); 
  
  });
};