const hobbyLogChart = document.getElementById("hobbyChart").getContext("2d");
const hobbyBtn = document.querySelector("#hobbyBtn");
let hobbyMin = document.getElementById("minHobby").value;

let hobbyGoal = 20;

getHobby();

document.getElementById("hobbyHoursGoal").innerHTML =
  "Hours left to reach your hobby time goal: " + hobbyGoal;

//Global options
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";

const hobbyChart = new Chart(hobbyLogChart, {
  type: "doughnut", //bar, horizontalBar, pie, line, donut, radar, polarArea
  data: {
    labels: [],
    datasets: [
      {
        label: ["Hobby Hours Per Day", hobbyGoal],
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
      text: "Hobby Tracker",
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

hobbyBtn.addEventListener("click", () => {
  event.preventDefault();
  addHobby();
});

function addHobby() {
  
  let inputDate = document.getElementById("hobbyDate").value;
    let day = moment(inputDate).utc().format("ddd, MMMM Do");
 

  //dayStudy = 2;
  hobbyMin = document.getElementById("minHobby").value;
  hobbyHours = hobbyMin / 60;
  hobbyHours = hobbyHours.toFixed(2); 
  hobbyGoal = hobbyGoal - hobbyHours;
  //date++;
  //we'd have a variable for their study input, that would be pushed, we would use some math to update hours left of goal
  hobbyChart.data.datasets[0].data.pop(hobbyGoal);
  hobbyChart.data.datasets[0].data.push(hobbyHours);
  hobbyChart.data.datasets[0].data.push(hobbyGoal);
  //we'd have a variable for the date that is being pushed, we'd have a variable count to 7, on day 7, it shows the total hours studied against the goal, that value is saved, drop table and start over?
  hobbyChart.data.labels.push(day);
  hobbyChart.data.labels.push(hobbyHours);
  //studyChart.data.labels = [studGoal];
  document.getElementById("hobbyHoursGoal").innerHTML =
    "Hours left this week to work on hobby: " + hobbyGoal;
 
  hobbyChart.update();

  const newHobby = {
    date: inputDate,
    value: hobbyMin
  };
  // Send the POST request.
  $.ajax("/api/hobby", {
    type: "POST",
    data: newHobby
  }).then(data => {
    console.log(data);
    console.log("logged hobby time");

    location.reload();

  });
  getHobby(); 
};


function getHobby() {

  $.get("/api/hobby", function(data) {
  
    const dataSet = [data];

    const mappedData = data.reduce((last, date) =>{
      const temp = {};
      temp[date.date] = last[date.date] ? last[date.date] + date.value : date.value;
      return {...last, ...temp};
    }, {}); 
  const chartData = Object.keys(mappedData).map(k => ({date: k, value: mappedData[k]}));
  console.log(chartData); 

  const hobbyData = [];

  if(chartData.length<= 7){
      for (let i = 0; i < chartData.length; i++) {
        chartData.sort(function(a,b){
      
          return new Date(b.date) - new Date(a.date);
        });
        
        hobbyData.push(chartData[i]); 
        
      };
    }
    else if(chartData.length >7){
      for (let i = 0; i < 7; i++) {
        chartData.sort(function(a,b){
  
          return new Date(b.date) - new Date(a.date);
        });
        
        hobbyData.push(chartData[i]); 
        
      };
    };
   
    hobbyData.reverse(); 

  for (let i = 0; i < hobbyData.length; i++) {

    let hobbyHours = hobbyData[i].value / 60; 
    hobbyHours = hobbyHours.toFixed(2); 
    
    hobbyChart.data.labels.push(hobbyData[i].date);
    hobbyData[i].date = moment(hobbyData[i].date).utc().format("ddd, MMMM Do");
    hobbyChart.data.datasets[0].data.push(hobbyHours);
   
    if (hobbyGoal <= 0) {
      document.getElementById("hobbyHoursGoal").innerHTML =
        "A master at your craft! You've met your hobby time goal!";
      hobbyGoal = 0;
    }
    document.getElementById("hobbyHoursGoal").innerHTML =
    "Hours left this week to study: " + hobbyGoal;
};
  hobbyChart.update(); 
  

  });
}
