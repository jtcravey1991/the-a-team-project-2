const sleepLogChart = document.getElementById("myChart").getContext("2d");

const sleepTime = document.querySelector("#sleepBtn");




getSleepGoal();


function getSleepGoal() {
  $.get("/api/user_prefs", function (data) {

    let sleepGoal = data.sleepGoal;
    generateChart(sleepGoal);
  });

};


// $.ajax("/api/user_prefs", {
//   type: "GET",
//   data: sleepGoal
// }).then(data => {
//   console.log(data.sleepGoal);

// });


//getSleep();
//Global options
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";

function generateChart(sleepGoal) {
  const sleepChart = new Chart(sleepLogChart, {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Sleep Hours Per Night",
          data: [],
          backgroundColor: "CornflowerBlue",
          hoverBackgroundColor: "LightBlue",
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
  })
  getSleep(sleepChart, sleepGoal);

  sleepTime.addEventListener("click", () => {
    event.preventDefault();
    addSleep(sleepChart);
  });
}


function addSleep(sleepChart) {
  let inputDate = document.getElementById("startOne").value;

  let logDate = moment(inputDate).utc().format("ddd, MMMM Do");


  sleepHours = document.getElementById("sleepLog").value;

  sleepChart.data.datasets[0].data.push(sleepHours);

  sleepChart.data.labels.push(logDate);

  sleepChart.update();

  // document.getElementById("sleepHoursGoal").innerHTML =
  // "You've set a goal for " + sleepGoal + " hours per night";
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

function getSleep(sleepChart, sleepGoal) {
  $.get("/api/sleep", function (data) {


    const dataSet = [data];
    console.log(dataSet);
    const mappedData = data.reduce((last, date) => {
      const temp = {};
      temp[date.date] = last[date.date] ? last[date.date] + date.value : date.value;
      return { ...last, ...temp };
    }, {});
    const chartData = Object.keys(mappedData).map(k => ({ date: k, value: mappedData[k] }));
    console.log(chartData);


    const sleepData = [];

    if (chartData.length <= 7) {
      for (let i = 0; i < chartData.length; i++) {
        chartData.sort(function (a, b) {

          return new Date(b.date) - new Date(a.date);
        });

        sleepData.push(chartData[i]);

      };
    }
    else if (chartData.length > 7) {
      for (let i = 0; i < 7; i++) {
        chartData.sort(function (a, b) {

          return new Date(b.date) - new Date(a.date);
        });

        sleepData.push(chartData[i]);

      };
    };

    sleepData.reverse();



    for (let i = 0; i < sleepData.length; i++) {

      sleepChart.data.datasets[0].data.push(sleepData[i].value);

      sleepData[i].date = moment(sleepData[i].date).utc().format("ddd, MMMM Do")
      sleepChart.data.labels.push(sleepData[i].date);

      if (sleepData[sleepData.length - 1].value < sleepGoal) {
        document.getElementById("sleepProgress").innerHTML = "You need more sleep!";
      } else {
        document.getElementById("sleepProgress").innerHTML =
          "You must feel well rested!";
      }
    };

    sleepChart.update();

  });
};