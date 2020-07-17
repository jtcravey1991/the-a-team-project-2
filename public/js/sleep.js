const sleepLogChart = document.getElementById("myChart").getContext("2d");

const sleepTime = document.querySelector("#sleepBtn");

let sleepGoal = 8;

document.getElementById("sleepHoursGoal").innerHTML =
  "You've set a goal for " + sleepGoal + " hours per night";
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
  let logDate = document.getElementById("startOne").value;
  logDate = moment(logDate).format("ddd, MMMM Do");
  

  sleepGoal = 8;

  sleepHours = document.getElementById("sleepLog").value;

  sleepChart.data.datasets[0].data.push(sleepHours);

  sleepChart.data.labels.push(logDate);

  if (sleepHours < sleepGoal) {
    document.getElementById("sleepProgress").innerHTML = "You need more sleep!";
  } else {
    document.getElementById("sleepProgress").innerHTML =
      "You must feel well rested!";
  }

  document.getElementById("sleepHoursGoal").innerHTML =
    "You've set a goal for " + sleepGoal + " hours per night";
  sleepChart.update();

  const newSleep = {
    date: logDate,
    value: sleepHours
  };
  // Send the POST request.
  $.ajax("/api/sleep", {
    type: "POST",
    data: newSleep
  }).then(data => {
    console.log(data);
    console.log("logged sleep");

  });
};
