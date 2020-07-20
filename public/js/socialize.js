const socializeLogChart = document.getElementById("socializeChart").getContext("2d");

const socializeBtn = document.querySelector("#socializeBtn");

getSocialize();
//Global options
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";

const socializeChart = new Chart(socializeLogChart, {

  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "Socialized",
        data: [],
        backgroundColor: "SteelBlue",
        hoverBackgroundColor: "LightBlue",
        barThickness: 50
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: "Socializing Tracker",
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

socializeBtn.addEventListener("click", () => {
  event.preventDefault();
  addSocializeValue();
});


function addSocializeValue(){
    let inputDate = document.getElementById("logSocialDate").value;
    let day = moment(inputDate).utc().format("ddd, MMMM Do");

  socializeValue = document.getElementById("socializeValue").value;

  socializeChart.data.datasets[0].data.push(socializeValue);
  socializeChart.data.labels.push(day);


  socializeChart.update();

  const newSocialize = {
    date: inputDate,
    value: socializeValue
  };
  // Send the POST request.
  $.ajax("/api/socialize", {
    type: "POST",
    data: newSocialize
  }).then(data => {
    console.log(data);
    console.log("logged social quality rating");
    location.reload(); 
  });
}

function getSocialize() {

    $.get("/api/socialize", function(data) {
    
        const dataSet = [data];

        const mappedData = data.reduce((last, date) =>{
          const temp = {};
          temp[date.date] = last[date.date] ? last[date.date] + date.value : date.value;
          return {...last, ...temp};
        }, {}); 
      const chartData = Object.keys(mappedData).map(k => ({date: k, value: mappedData[k]}));
      console.log(chartData); 

      const socialData = [];
      if(chartData.length <= 7){
        for (let i = 0; i < chartData.length; i++) {
          chartData.sort(function(a,b){
        
            return new Date(b.date) - new Date(a.date);
          });
          
          socialData.push(chartData[i]); 
        }
      }
      else if(chartData.length > 7){
        for (let i = 0; i < 7; i++) {
          chartData.sort(function(a,b){
         
            return new Date(b.date) - new Date(a.date);
          });
          socialData.push(chartData[i]); 
        } 
      };
      socialData.reverse(); 
 
    for (let i = 0; i < socialData.length; i++) {
     
      socializeChart.data.datasets[0].data.push(socialData[i].value);
  
      socialData[i].date = moment(socialData[i].date).utc().format("ddd, MMMM Do")
      socializeChart.data.labels.push(socialData[i].date);

      let socializeInput = socialData[socialData.length -1].value; 

      if (socializeInput == 3 || socializeInput == 4) {
        document.getElementById("socializeProgress").innerHTML = "Keep up the social quality!"
    } else if(socializeInput == 5){
        document.getElementById("socializeProgress").innerHTML = "Wow! What a friend!"
    } else{
        document.getElementById("socializeProgress").innerHTML = "Give a friend a call!"
    };
  
  };
    socializeChart.update(); 
    
    });
  };

