
$("#sleepBtn").on("click", function (e){
    e.preventDefault(); 
    setSleepGoal();
}); 

function setSleepGoal(){
console.log("sleep goal");
//need ajax to send sleep goal to backend
};



$("#studyBtn").on("click", function (e){
    e.preventDefault(); 
    setStudyGoal();
}); 

function setStudyGoal(){
console.log("study goal"); 
    //need ajax to send study goal to backend
};
