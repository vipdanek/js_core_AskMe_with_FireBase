// https://podcast-questions-app-ad963.firebaseio.com/
export class Question {
  //------------------------------------
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
      .then(addToLocalStorage)
      .then(Question.rebderList);
  }
  //------------------------------------
  static renderList() {
    const questions = getQuestionFromLocalStorage();
    const html = questions.length
      ? questions.map(toCard).join(" ")
      : `<div class="mui--text-headline">Вы пока ничего не спрашивали </div>`;
    const list = document.getElementById("list");
    list.innerHTML = html;
  }
  //------------------------------------
  static fetch(token) {
    if (!token) {
      return Promise.resolve(`<p class="error">You are doesn't have token</p>`);
    }

    //по данной ссылку мы получаем через метод ((get) кот-й идет по умолчанию ) список вопросов
    return fetch(
      `https://podcast-questions-app-ad963.firebaseio.com/questions.json?auth=${token}`
    )
      .then(response => response.json())
      .then(response => {
        if (response && response.error) {
          return `<p class="error">${response.error}</p>`;
        }
        return response
          ? Object.keys(response).map(key => ({
              ...response[key], //тут находится text && ID
              id: key
            }))
          : []; //возвращается в том случае если в response === null
      });
  }
  //------------------------------------
  static listToHTML(questions) {
    return questions.length
      ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join("")}</ol>`
      : "<p>Questions doesn't have</p>";
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

function toCard(question) {
  return ` 
  <div class="mui--text-black-54">
  ${new Date(question.date).toLocaleDateString()}
  ${new Date(question.date).toLocaleTimeString()}

 </div>
<div>
  ${question.text}
</div> 
  `;
}
