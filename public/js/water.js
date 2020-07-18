const waterLogChart = document.getElementById("waterChart").getContext("2d");

const waterBtn = document.querySelector("#waterBtn");

getWater(); 
//variable for water ounce goal
let waterGoal = 32;
document.getElementById("waterGoal").innerHTML =
  "You've set a goal for " + waterGoal + " ounces of water per day!";
//Global options
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";

const waterChart = new Chart(waterLogChart, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "Water Oz",
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
      text: "Water Tracker",
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
            max: waterGoal + 8,
            stepSize: 1
          }
        }
      ]
    }
  }
});

waterBtn.addEventListener("click", () => {
  event.preventDefault();
  addWater();

});
function addWater() {
  let inputDate = document.getElementById("waterDate").value;
  let logDate = moment(inputDate).format("ddd, MMMM Do");

  waterOunces = document.getElementById("waterLog").value;

  waterChart.data.datasets[0].data.push(waterOunces);

  waterChart.data.labels.push(logDate);

  if (waterOunces < waterGoal) {
    document.getElementById("waterProgress").innerHTML = "Remember to hydrate!";
  } else {
    document.getElementById("waterProgress").innerHTML =
      "You met your daily water goal! Great work!";
  }

//   document.getElementById("waterGoal").innerHTML =
//     "You've set a goal for " + waterGoal + " ounces of water per day.";
  waterChart.update();

  const newWater = {
    date: inputDate,
    value: waterOunces
  };
  // Send the POST request.
  $.ajax("/api/water", {
    type: "POST",
    data: newWater
  }).then(data => {
    console.log(data);
    console.log("logged water");

  });
};

function getWater() {
  $.get("/api/water", function(data) {
  
     //array that takes in the data values to populate the chart
  for (let i = 0; i < data.length; i++) {

    waterChart.data.datasets[0].data.push(data[i].value);

    data[i].date = moment(data[i].date).format("ddd, MMMM Do")
    waterChart.data.labels.push(data[i].date);

};
  waterChart.update(); 
  
  });
};