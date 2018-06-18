var localStorage = window.localStorage
localStorage.setItem("userScore", 0)
localStorage.setItem("questionId", heartburnJSON.questions[4].id)

generateQuestionText(localStorage.getItem("questionId"))
generateAnswerButtons(localStorage.getItem("questionId"))
document.getElementById("next").addEventListener("click", function() {
  generateNextPageContent(localStorage.getItem("questionId"),
    document.querySelectorAll("#answers button.active")[0])
})

function generateQuestionText(idLabel) {
  document.getElementById("question").innerHTML = getQuestionElementFromId(idLabel).question_text
}

function getQuestionElementFromId(idLabel) {
  return heartburnJSON.questions.filter(question => question.id === idLabel)[0]
}

function generateAnswerButtons(idLabel) {
  var answerContainer = document.getElementById("answers")
  while (answerContainer.firstChild) {
    answerContainer.removeChild(answerContainer.firstChild)
  }
  var answers = getQuestionElementFromId(idLabel).answers
  answers.forEach(answer => {
    answerContainer.innerHTML +=
      `<button id="${answer.id}" value="${answer.score}">${answer.label}</button>`
  })
  answerContainer.querySelectorAll("button").forEach(button => {
    button.onclick = selectButton
  })
}

function selectButton() {
  var buttons = this.parentNode.childNodes
  if (this.id === buttons[0].id) {
    buttons[0].classList.add("active")
    buttons[1].classList.remove("active")
    return
  }
  buttons[1].classList.add("active")
  buttons[0].classList.remove("active")
}

function generateNextPageContent(currentQuestionId, answer) {
  var newScore = Number(localStorage.getItem("userScore")) + Number(answer.value)
  var next = getNextStepId(currentQuestionId, answer.id, newScore)
  localStorage.setItem("userScore", newScore)
  localStorage.setItem("questionId", next.id)
  if (next.type === "question") {
    generateQuestionText(next.id)
    generateAnswerButtons(next.id)
  } else {
    window.location.href = "outcome.html"
  }
}

function getNextStepId(idLabel, answerId = null, score = 0) {
  if (idLabel !== "heartburn_lost_weight") { // last question
    return {"type": "question", "id": getNextQuestionId(idLabel, answerId)}
  }
  return {"type": "outcome"}
}

function getNextQuestionId(idLabel, answerId = null) {
  var listNext = getQuestionElementFromId(idLabel).next
  if (listNext.length === 1) {
    return listNext[0].next_question
  }
  return listNext.filter(next => next.answered === answerId)[0].next_question
}
