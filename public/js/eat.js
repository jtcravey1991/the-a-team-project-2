const eatLogChart = document.getElementById("eatChart").getContext("2d");

const eatBtn = document.querySelector("#eatBtn");
getEat();
//Global options
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";

const eatChart = new Chart(eatLogChart, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "Eat Healthy",
        data: [],
        backgroundColor: "ForestGreen",
        hoverBackgroundColor: "LightBlue",
        barThickness: 50
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: "Eat Tracker",
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
            max: 5,
            stepSize: 1
          }
        }
      ]
    }
  }
});

eatBtn.addEventListener("click", () => {
  event.preventDefault();
  addEatValue();
});

function addEatValue(){
    let inputDate = document.getElementById("logDate").value;
    let day = moment(inputDate).format("ddd, MMMM Do");

  eatValue = document.getElementById("eatValue").value;
  console.log(eatValue);

  eatChart.data.datasets[0].data.push(eatValue);

  eatChart.data.labels.push(day);

  if (eatValue == 3 || eatValue == 4) {
    document.getElementById("eatProgress").innerHTML =
      "Keep up the healthy eating!";
  } else if (eatValue == 5) {
    document.getElementById("eatProgress").innerHTML = "Wow! Amazing!";
  } else {
    document.getElementById("eatProgress").innerHTML =
      "Let's try to eat better!";
  }
  eatChart.update();

  const newEat = {
    date: inputDate,
    value: eatValue
  };
  // Send the POST request.
  $.ajax("/api/eat", {
    type: "POST",
    data: newEat
  }).then(data => {
    console.log(data);
    console.log("logged healthy eating rating");
  });
}

function getEat() {
  $.get("/api/eat", data => {
    //array that takes in the data values to populate the chart
    for (let i = 0; i < data.length; i++) {
      eatChart.data.datasets[0].data.push(data[i].value);

      data[i].date = moment(data[i].date).format("ddd, MMMM Do");
      eatChart.data.labels.push(data[i].date);
    }
    eatChart.update();
  });
}
