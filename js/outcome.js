function getOutcomeId(score) {
  var next = getQuestionElementFromId("heartburn_lost_weight").next
  if (score <= next[0].max_score) {
    return next[0].outcome
  } else if (score <= next[1].max_score) {
    return next[1].outcome
  }
  return next[2].outcome
}

function getQuestionElementFromId(idLabel) {
  return heartburnJSON.questions.filter(question => question.id === idLabel)[0]
}

function showOutcome(score) {
  var id = getOutcomeId(score)
  var outcome = heartburnJSON.outcomes.filter(outcome => outcome.id === id)[0]
  document.getElementById("outcome_text").innerHTML = outcome.text
  if (outcome.show_booking_button) {
    document.getElementById("book_a_meeting").style.display = "block"
  }
}

showOutcome(window.localStorage.getItem("userScore"))
