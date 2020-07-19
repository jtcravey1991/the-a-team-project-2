const meditateLogChart = document
  .getElementById("meditationChart")
  .getContext("2d");

const meditateBtn = document.querySelector("#meditationBtn");

//variable for daily meditation minute goal
const meditateGoal = 30;

getMeditate();

document.getElementById("meditationGoal").innerHTML =
  "You've set a goal for " + meditateGoal + " minutes of meditation per day!";
//Global options
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";

const meditationChart = new Chart(meditateLogChart, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "Meditation",
        data: [],
        backgroundColor: "RosyBrown",
        hoverBackgroundColor: "Thistle",
        barThickness: 50
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: "Meditation Tracker",
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
            max: meditateGoal,
            stepSize: 2
          }
        }
      ]
    }
  }
});

meditateBtn.addEventListener("click", () => {
  event.preventDefault();
  addMeditation();
});
function addMeditation() {
  let inputDate = document.getElementById("meditationDate").value;
  let logDate = moment(inputDate).utc().format("ddd, MMMM Do");

  meditateValue = document.getElementById("meditationLog").value;
  console.log(meditateValue);

  meditationChart.data.datasets[0].data.push(meditateValue);

  meditationChart.data.labels.push(logDate);


  meditationChart.update();

  const newMeditation = {
    date: inputDate,
    value: meditateValue
  };

  // Send the POST request.
  $.ajax("/api/meditation", {
    type: "POST",
    data: newMeditation
  }).then(data => {
    console.log(data);
    console.log("logged meditation");

    location.reload();

  })
}

function getMeditate() {


  $.get("/api/meditation", function (data) {

    const dataSet = [data];

    const mappedData = data.reduce((last, date) => {
      const temp = {};
      temp[date.date] = last[date.date] ? last[date.date] + date.value : date.value;
      return { ...last, ...temp };
    }, {});
    const chartData = Object.keys(mappedData).map(k => ({ date: k, value: mappedData[k] }));
    console.log(chartData);

    //array that takes in the data values to populate the chart
    for (let i = 0; i < chartData.length; i++) {

      meditationChart.data.datasets[0].data.push(chartData[i].value);

      chartData[i].date = moment(chartData[i].date).utc().format("ddd, MMMM Do");
      meditationChart.data.labels.push(chartData[i].date);

      if (chartData[chartData.length - 1].value < meditateGoal) {
        document.getElementById("meditationProgress").innerHTML = "Take some time to be still!";
      } else {
        document.getElementById("meditationProgress").innerHTML =
          "A buddha in the making; you met your daily meditation goal!";
      }

    };
    meditationChart.update();

  })
}
