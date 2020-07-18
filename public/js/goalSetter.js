
//WORK IN PROGRESS NEED MY HERO JACOB
$("#createGoalsBtn").on("click", () => {
  const userData = {
    isTrackingStudyTime: $("#studyCheck").checked(),
    studyTimeGoal: $("#studyGoalVal").val(),
    isTrackingSleep: $("#sleepCheck").checked(),
    sleepGoal: $("#sleepGoalVal").val(),
    isTrackingHealthyEats: $("#eatCheck").checked(),
    heathyEatsGoal: $("#eatGoalVal").val(),
    isTrackingDrinkingWater: $("#waterCheck").checked(),
    drinkingWaterGoal: $("#waterGoalVal").val(),
    isTrackingMeditation: $("#meditateCheck").checked(),
    meditationGoal: $("#meditateGoalVal").val(),
    isTrackingExercise: $("#exerciseCheck").checked(),
    exerciseGoal: $("#exerciseGoalVal").val(),
    isTrackingHugs: $("#hugCheck").checked(),
    hugGoal: $("#hugGoalVal").val(),
    isTrackingSocializing: $("#socializeCheck").checked(),
    socializingGoal: $("#socializeGoalVal").val(),
    isTrackingJokes: $("#jokeCheck").checked(),
    jokesGoal: $("#jokeGoalVal").val(),
    isTrackingHobby: $("#hobbyCheck").checked(),
    hobbyGoal: $("#hobbyGoalVal").val(),
  };

  $.ajax("/api/user_data", {
    type: "PUT",
    data: userData
  }).then(data => {
    console.log(data);
    console.log("sent sleep goal");
  });

  req.login(user, err => {
    if (err) return err;
  })
});