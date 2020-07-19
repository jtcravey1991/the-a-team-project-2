$(".plus-minus").change(function(event) {
  if ($(this).prop("checked")) {
    $(this).parent().parent().addClass("goal__checked");
  } else if (!$(this).prop("checked")) {
    $(this).parent().parent().removeClass("goal__checked");
  }
});

$("#createGoalsBtn").on("click", () => {
  const userData = {
    isTrackingStudyTime: $("#studyCheck").prop("checked"),
    studyTimeGoal: $("#studyGoalVal").val(),
    isTrackingSleep: $("#sleepCheck").prop("checked"),
    sleepGoal: $("#sleepGoalVal").val(),
    isTrackingHealthyEats: $("#eatCheck").prop("checked"),
    heathyEatsGoal: $("#eatGoalVal").val(),
    isTrackingDrinkingWater: $("#waterCheck").prop("checked"),
    drinkingWaterGoal: $("#waterGoalVal").val(),
    isTrackingMeditation: $("#meditateCheck").prop("checked"),
    meditationGoal: $("#meditateGoalVal").val(),
    isTrackingExercise: $("#exerciseCheck").prop("checked"),
    exerciseGoal: $("#exerciseGoalVal").val(),
    isTrackingHugs: $("#hugCheck").prop("checked"),
    hugGoal: $("#hugGoalVal").val(),
    isTrackingSocializing: $("#socializeCheck").prop("checked"),
    socializingGoal: $("#socializeGoalVal").val(),
    isTrackingJokes: $("#jokeCheck").prop("checked"),
    jokesGoal: $("#jokeGoalVal").val(),
    isTrackingHobby: $("#hobbyCheck").prop("checked"),
    hobbyGoal: $("#hobbyGoalVal").val()
  };

  $.ajax("/api/user_data", {
    type: "PUT",
    data: userData
  }).then(data => {
    console.log(data);
    console.log("sent sleep goal");
  });

  req.login(user, err => {
    if (err) {
      return err;
    }
  });
});
