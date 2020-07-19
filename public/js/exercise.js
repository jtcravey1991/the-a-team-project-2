const exerciseLogChart = document.getElementById("exerciseChart").getContext("2d");
const exerciseBtn = document.querySelector("#exerciseBtn");
let exerciseMin = document.getElementById("minExercise").value;

let exerciseGoal = 20;

getExercise();

document.getElementById("exerciseHoursGoal").innerHTML =
  "Hours left this week to exercise: " + exerciseGoal;

//Global options
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";

const exerciseChart = new Chart(exerciseLogChart, {
  type: "doughnut", //bar, horizontalBar, pie, line, donut, radar, polarArea
  data: {
    labels: [],
    datasets: [
      {
        label: ["Exercise Hours Per Day", exerciseGoal],
        data: [],
        backgroundColor: [
          "CornflowerBlue",
          "AliceBlue",
          "Lavendar",
          "LightSalmon",
          "LightSkyBlue",
          "MediumAquamarine",
          "RosyBrown"
        ],
        hoverBackgroundColor: "LightBlue"   
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: "Exercise Tracker",
      fontSize: 25
    },
    legend: {
      //display, font options as well in labels object
      position: "top"
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
      } //tooltips can be enabled:true or false
    },
    center: {
      //hoping to get this working at some point
      // the longest text that could appear in the center
      maxText: "100%",
      text: "67%",
      fontColor: "#FF6684",
      fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      fontStyle: "normal",
      // fontSize: 12,
      // if a fontSize is NOT specified, we will scale (within the below limits) maxText to take up the maximum space in the center
      // if these are not specified either, we default to 1 and 256
      minFontSize: 1,
      maxFontSize: 256
    }
  }
});

exerciseBtn.addEventListener("click", () => {
  event.preventDefault();
  addExercise();
});

function addExercise() {
  let inputDate = document.getElementById("exDate").value;
  let day = moment(inputDate).utc().format("ddd, MMMM Do");
 
  //dayStudy = 2;
  exerciseMin = document.getElementById("minExercise").value;
  exerciseHours = exerciseMin / 60;
  exerciseHours = exerciseHours.toFixed(2); 
  exerciseGoal = exerciseGoal - exerciseHours;
  //date++;
  //we'd have a variable for their study input, that would be pushed, we would use some math to update hours left of goal
  exerciseChart.data.datasets[0].data.pop(exerciseGoal);
  exerciseChart.data.datasets[0].data.push(exerciseHours);
  exerciseChart.data.datasets[0].data.push(exerciseGoal);
  //we'd have a variable for the date that is being pushed, we'd have a variable count to 7, on day 7, it shows the total hours studied against the goal, that value is saved, drop table and start over?
  exerciseChart.data.labels.push(day);
  exerciseChart.data.labels.push(exerciseHours);

 
  exerciseChart.update();

  const newExercise = {
    date: inputDate,
    value: exerciseMin
  };
  // Send the POST request.
  $.ajax("/api/exercise", {
    type: "POST",
    data: newExercise
  }).then(data => {
    console.log(data);
    console.log("logged exercise time");
    location.reload(); 
  });
  
  //GET request to update
  getExercise(); 
  
}


function getExercise() {
  $.get("/api/exercise", function(data) {
  
    const dataSet = [data];

    const mappedData = data.reduce((last, date) =>{
      const temp = {};
      temp[date.date] = last[date.date] ? last[date.date] + date.value : date.value;
      return {...last, ...temp};
    }, {}); 
  const chartData = Object.keys(mappedData).map(k => ({date: k, value: mappedData[k]}));
  console.log(chartData); 

     //array that takes in the data values to populate the chart
  for (let i = 0; i < chartData.length; i++) {

  /////
  let exerciseHours = chartData[i].value / 60; 
  exerciseHours = exerciseHours.toFixed(2); 
  chartData[i].date = moment(chartData[i].date).utc().format("ddd, MMMM Do");

    exerciseChart.data.labels.push(chartData[i].date);
    exerciseChart.data.datasets[0].data.push(exerciseHours);

   
  exerciseGoal = exerciseGoal - exerciseHours;

    document.getElementById("exerciseHoursGoal").innerHTML =
    "Hours left this week to exercise: " + exerciseGoal;
    if (exerciseGoal <= 0) {
      document.getElementById("exerciseHoursGoal").innerHTML =
        "Now that is fitness! You've met your exercise goal!";
      exerciseGoal = 0;
    }
  
};
  exerciseChart.update(); 

  
  });
};