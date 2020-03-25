import { Question } from "./question";
import { isValid } from "./utils";
import "./styles.css";

const form = document.getElementById("form");
const input = form.querySelector("#question-input");
const submitBtn = form.querySelector("#submit");

//это нативное событие кот-е слушает когда мы нажимаем на enter||на кнопку
form.addEventListener("submit", submitFormHandler);
input.addEventListener("input", () => {
  submitBtn.disabled = !isValid(input.value);
});

function submitFormHandler(event) {
  //preventDefault=> что бы страница не перез-сь
  event.preventDefault();

  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      //.toJSON вернули в формат
      date: new Date().toJSON()
    };
    submitBtn.disabled = true;
    //Async request to server to save question
    Question.create(question).then(() => {
      console.log("Question", question);
      input.value = "";
      input.className = "";
      submitBtn.disabled = false;
    });
  }
}
