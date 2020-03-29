import { Question } from "./question";
import { isValid, createModal } from "./utils";
import { getAuthForm, authWithEmailAndPassword } from "./auth";

import "./styles.css";

const form = document.getElementById("form");
const input = form.querySelector("#question-input");
const submitBtn = form.querySelector("#submit");
const modalBtn = document.querySelector("#modal-btn");

//это нативное событие кот-е слушает когда мы нажимаем на enter||на кнопку
window.addEventListener("load", Question.renderList);
modalBtn.addEventListener("click", openModal);
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

// btn click on modal
function openModal() {
  createModal("Authorization", getAuthForm());
  //отменить дефолдное зна-е перез-ки страницы
  document
    .getElementById("auth-form")
    .addEventListener("submit", authFormHandler, { once: true });
}

function authFormHandler(event) {
  event.preventDefault();

  let btn = event.target.querySelector("button");
  //логика по авторизации (доступ к email && password)
  // event.target => обьект у кот-го прису-ет querySelector с помощью  кот-го полу-ем ID, и с помощью value забираме данные
  let email = event.target.querySelector("#email").value;
  let password = event.target.querySelector("#password").value;

  btn.disabled = true;
  authWithEmailAndPassword(email, password)
    //можно написать 2мя ваириантами из-за того чт опередаем один параметр
    //1) .then(token => {
    //вызываем у класса Question(из question) статический метод(прописаный) fetch
    //   return Question.fetch(token);
    // });
    // 2)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => (btn.disabled = false));
}

function renderModalAfterAuth(content) {
  if (typeof content === "string") {
    createModal("Error!", content);
  } else {
    createModal("List questions ...", Question.listToHTML(content));
  }
}
