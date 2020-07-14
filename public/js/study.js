
let donutChart = document.getElementById("donutChart").getContext("2d");
const studyTime = document.querySelector("#studyBtn");
let studyMin = document.getElementById("minStudy").value;

let studGoal = 20;
//let date = 0;

document.getElementById("studyHoursGoal").innerHTML = "Hours left this week to study: " + studGoal;

//Global options
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";


let studyChart = new Chart(donutChart, {
    type: "doughnut", //bar, horizontalBar, pie, line, donut, radar, polarArea
    data: {
        labels: [],
        datasets: [{
            label: ["Study Hours Per Day", studGoal],
            data: [],
            backgroundColor: ["CornflowerBlue", "AliceBlue", "Lavendar", "LightSalmon", "LightSkyBlue", "MediumAquamarine", "RosyBrown"]
            
        }]
    },
    options: {
        title: {
            display: true,
            text: "Study Tracker",
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
            }//tooltips can be enabled:true or false
        },
        center: {//hoping to get this working at some point
            // the longest text that could appear in the center
            maxText: '100%',
            text: '67%',
            fontColor: '#FF6684',
            fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            fontStyle: 'normal',
            // fontSize: 12,
            // if a fontSize is NOT specified, we will scale (within the below limits) maxText to take up the maximum space in the center
            // if these are not specified either, we default to 1 and 256
            minFontSize: 1,
            maxFontSize: 256,
        }
    }
});

studyTime.addEventListener("click", function () {
    event.preventDefault();
    addValue();
});

function addValue() {
    let day = document.getElementById("start").value;
    console.log(day);
    //dayStudy = 2;
    studyMin = document.getElementById("minStudy").value;
    dayStudy = studyMin / 60;
    studGoal = studGoal - dayStudy;
    //date++;
    //we'd have a variable for their study input, that would be pushed, we would use some math to update hours left of goal
    studyChart.data.datasets[0].data.pop(studGoal);
    studyChart.data.datasets[0].data.push(dayStudy);
    studyChart.data.datasets[0].data.push(studGoal);
    //we'd have a variable for the date that is being pushed, we'd have a variable count to 7, on day 7, it shows the total hours studied against the goal, that value is saved, drop table and start over?
    studyChart.data.labels.push(day);
    //studyChart.data.labels = [studGoal];
    document.getElementById("studyHoursGoal").innerHTML = "Hours left this week to study: " + studGoal;
    if (studGoal <= 0) {

        document.getElementById("studyHoursGoal").innerHTML = "Congratulations! You've met your study goal!";
        studGoal = 0;
    };
    studyChart.update();
};