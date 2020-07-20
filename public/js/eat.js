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
        hoverBackgroundColor: "PaleGreen",
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

function addEatValue() {
  let inputDate = document.getElementById("logDate").value;
  const day = moment(inputDate).utc().format("ddd, MMMM Do");

  let eatValue = document.getElementById("eatValue").value;

  eatChart.data.datasets[0].data.push(eatValue);
  eatChart.data.labels.push(day);

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
    location.reload(); 
  });
};


function getEat() {
  $.get("/api/eat", data => {

    const dataSet = [data];
    console.log(dataSet); 
    const mappedData = data.reduce((last, date) =>{
    const temp = {};
    temp[date.date] = last[date.date] ? last[date.date] + date.value : date.value;
      return {...last, ...temp};
      }, {}); 
      const chartData = Object.keys(mappedData).map(k => ({date: k, value: mappedData[k]}));
      console.log(chartData); 

  const eatData = [];
  if(chartData.length<= 7){
    for (let i = 0; i < chartData.length; i++) {
      chartData.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
      });
      
      eatData.push(chartData[i]); 
      
    };
  }
  else if(chartData.length >7){
    for (let i = 0; i < 7; i++) {
      chartData.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
      });
      
      eatData.push(chartData[i]); 
      
    };
  };
 
 
  eatData.reverse(); 
  for (let i = 0; i < eatData.length; i++) {
    
   eatChart.data.datasets[0].data.push(eatData[i].value);

    eatData[i].date = moment(eatData[i].date).utc().format("ddd, MMMM Do");
 
    eatChart.data.labels.push(eatData[i].date);
   
    let eatValue = eatData[eatData.length-1].value; 
    
    if (eatValue == 3 || eatValue == 4) {
      document.getElementById("eatProgress").innerHTML =
        "Keep up the healthy eating!";
    } else if (eatValue == 5) {
      document.getElementById("eatProgress").innerHTML = "Wow! Amazing!";
    } else {
      document.getElementById("eatProgress").innerHTML =
        "Let's try to eat better!";
    } 
  }
    eatChart.update();
   });
};
