init();

// initialized page with user preferences
function init() {
  //creat goals button listener
  $("#createGoalsBtn").on("click", () => {
    const userData = {
      isTrackingStudyTime: $("#studyCheck").prop("checked"),
      studyTimeGoal: valueChecker($("#studyGoalVal").val()),
      isTrackingSleep: $("#sleepCheck").prop("checked"),
      sleepGoal: valueChecker($("#sleepGoalVal").val()),
      isTrackingHealthyEats: $("#eatCheck").prop("checked"),
      healthyEatsGoal: valueChecker($("#eatGoalVal").val()),
      isTrackingDrinkingWater: $("#waterCheck").prop("checked"),
      drinkingWaterGoal: valueChecker($("#waterGoalVal").val()),
      isTrackingMeditation: $("#meditateCheck").prop("checked"),
      meditationGoal: valueChecker($("#meditateGoalVal").val()),
      isTrackingExercise: $("#exerciseCheck").prop("checked"),
      exerciseGoal: valueChecker($("#exerciseGoalVal").val()),
      isTrackingHugs: $("#hugCheck").prop("checked"),
      hugsGoal: valueChecker($("#hugsGoalVal").val()),
      isTrackingSocializing: $("#socializeCheck").prop("checked"),
      socializingGoal: valueChecker($("#socializeGoalVal").val()),
      isTrackingJokes: $("#jokesCheck").prop("checked"),
      jokesGoal: valueChecker($("#jokesGoalVal").val()),
      isTrackingHobby: $("#hobbyCheck").prop("checked"),
      hobbyGoal: valueChecker($("#hobbiesGoalVal").val())
    };

    $.ajax("/api/user_data", {
      type: "PUT",
      data: userData
    }).then(() => {
      console.log("hello world");
      location.reload();
      // window.location.replace("/dashboard");
    });
  });

  //check listener to add or remove class if goal is checked
  $(".plus-minus").change(function (event) {
    if ($(this).prop("checked")) {
      $(this).parent().parent().addClass("goal__checked");
    } else if (!$(this).prop("checked")) {
      $(this).parent().parent().removeClass("goal__checked");
    }
  });

  // initialized user preferences
  $.ajax("/api/user_prefs", {
    type: "GET"
  }).then(user => {
    $("#studyCheck").prop("checked", user.isTrackingStudyTime);
    $("#studyGoalVal").val(user.studyTimeGoal);
    $("#sleepCheck").prop("checked", user.isTrackingSleep);
    $("#sleepGoalVal").val(user.sleepGoal);
    $("#eatCheck").prop("checked", user.isTrackingHealthyEats);
    $("#eatGoalVal").val(user.healthyEatsGoal);
    $("#waterCheck").prop("checked", user.isTrackingDrinkingWater);
    $("#waterGoalVal").val(user.drinkingWaterGoal);
    $("#meditateCheck").prop("checked", user.isTrackingMeditation);
    $("#meditateGoalVal").val(user.meditationGoal);
    $("#exerciseCheck").prop("checked", user.isTrackingExercise);
    $("#exerciseGoalVal").val(user.exerciseGoal);
    $("#hugCheck").prop("checked", user.isTrackingHugs);
    $("#hugsGoalVal").val(user.hugsGoal);
    $("#socializeCheck").prop("checked", user.isTrackingSocializing);
    $("#socializeGoalVal").val(user.socializingGoal);
    $("#jokesCheck").prop("checked", user.isTrackingJokes);
    $("#jokesGoalVal").val(user.jokesGoal);
    $("#hobbyCheck").prop("checked", user.isTrackingHobby);
    $("#hobbiesGoalVal").val(user.hobbyGoal);
    setGoalClasses();
  });
}

// checks if goal is checked and assigns class
function setGoalClasses() {
  if ($("#sleepCheck").prop("checked")) {
    $("#sleepGoalDiv").addClass("goal__checked");
  }
  if ($("#studyCheck").prop("checked")) {
    $("#studyGoalDiv").addClass("goal__checked");
  }
  if ($("#eatCheck").prop("checked")) {
    $("#eatGoalDiv").addClass("goal__checked");
  }
  if ($("#waterCheck").prop("checked")) {
    $("#waterGoalDiv").addClass("goal__checked");
  }
  if ($("#exerciseCheck").prop("checked")) {
    $("#exerciseGoalDiv").addClass("goal__checked");
  }
  if ($("#socializeCheck").prop("checked")) {
    $("#socializeGoalDiv").addClass("goal__checked");
  }
  if ($("#meditateCheck").prop("checked")) {
    $("#meditationGoalDiv").addClass("goal__checked");
  }
  if ($("#jokesCheck").prop("checked")) {
    $("#jokesGoalDiv").addClass("goal__checked");
  }
  if ($("#hugCheck").prop("checked")) {
    $("#hugsGoalDiv").addClass("goal__checked");
  }
  if ($("#hobbyCheck").prop("checked")) {
    $("#hobbyGoalDiv").addClass("goal__checked");
  }
}

// checks if a value is null and returns 0 if so
function valueChecker(value) {
  if (!value) {
    return 0;
  } else {
    return value;
  }
}

//dashboard button listener
$("#dashboardBtn").click(() => {
  window.location.replace("/dashboard");
});

//logout button listener
$("#logoutBtn").click(() => {
  window.location.replace("/");
});