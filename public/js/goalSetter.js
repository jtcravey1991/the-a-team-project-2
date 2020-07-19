$(".plus-minus").change(function(event) {
  if ($(this).prop("checked")) {
    $(this)
      .parent()
      .parent()
      .addClass("goal__checked");
  } else if (!$(this).prop("checked")) {
    $(this)
      .parent()
      .parent()
      .removeClass("goal__checked");
  }
});

$("#createGoalsBtn").on("click", () => {
  const userData = {
    isTrackingStudyTime: $("#studyCheck").prop("checked"),
    studyTimeGoal: valueChecker($("#studyGoalVal").val()),
    isTrackingSleep: $("#sleepCheck").prop("checked"),
    sleepGoal: valueChecker($("#sleepGoalVal").val()),
    isTrackingHealthyEats: $("#eatCheck").prop("checked"),
    heathyEatsGoal: valueChecker($("#eatGoalVal").val()),
    isTrackingDrinkingWater: $("#waterCheck").prop("checked"),
    drinkingWaterGoal: valueChecker($("#waterGoalVal").val()),
    isTrackingMeditation: $("#meditateCheck").prop("checked"),
    meditationGoal: valueChecker($("#meditateGoalVal").val()),
    isTrackingExercise: $("#exerciseCheck").prop("checked"),
    exerciseGoal: valueChecker($("#exerciseGoalVal").val()),
    isTrackingHugs: $("#hugCheck").prop("checked"),
    hugGoal: valueChecker($("#hugGoalVal").val()),
    isTrackingSocializing: $("#socializeCheck").prop("checked"),
    socializingGoal: valueChecker($("#socializeGoalVal").val()),
    isTrackingJokes: $("#jokeCheck").prop("checked"),
    jokesGoal: valueChecker($("#jokeGoalVal").val()),
    isTrackingHobby: $("#hobbyCheck").prop("checked"),
    hobbyGoal: valueChecker($("#hobbyGoalVal").val())
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

function valueChecker(value) {
  if (!value) {
    return 0;
  }
  return value;
}
