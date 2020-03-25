// https://podcast-questions-app-ad963.firebaseio.com/
export class Question {
  //static ключ-е слово где используются стат-кие методы
  static create(question) {
    return fetch(
      "https://podcast-questions-app-ad963.firebaseio.com/questions.json",
      {
        method: "POST",
        body: JSON.stringify(question),
        //   ключь
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        question.id = response.name;
        return question;
      })
      .then(addToLocalStorage);
  }
}
function addToLocalStorage(question) {
  const all = getQuestionFromLocalStorage();
  all.push(question);
  localStorage.setItem("questions", JSON.stringify(all));
}
function getQuestionFromLocalStorage() {
  return JSON.parse(localStorage.getItem("questions") || "[]");
}
