$("#addSleepBtn").on("click", function (e){
    e.preventDefault(); 
    setSleepGoal();
}); 

function setSleepGoal(){
console.log("sleep goal");

    const sleepGoal = {
     goal: $("#sleepGoalVal").val()
    }
  // Send the POST request.
  $.ajax("/api/sleep", {
    type: "POST",
    data: sleepGoal
  }).then(data => {
    console.log(data);
    console.log("sent sleep goal");
  });
};



$("#addStudyBtn").on("click", function (e){
    e.preventDefault(); 
    setStudyGoal();
}); 

function setStudyGoal(){
console.log("study goal"); 
   

    const studyGoal = {
        goal: $("#studyGoalVal").val()
       }
     // Send the POST request.
     $.ajax("/api/study", {
       type: "POST",
       data: studyGoal
     }).then(data => {
       console.log(data);
       console.log("sent study goal");
     });
};

$("#addEatBtn").on("click", function (e){
    e.preventDefault(); 
    setEatGoal();
}); 

function setEatGoal(){
console.log("eat goal"); 
   

    const eatGoal = {
        goal: $("#eatGoalVal").val()
       }
     // Send the POST request.
     $.ajax("/api/eat", {
       type: "POST",
       data: eatGoal
     }).then(data => {
       console.log(data);
       console.log("sent eat goal");
     });
};