export function getAuthForm() {
  return `
    <form class="mui-form" id="auth-form">
            <div class="mui-textfield mui-textfield--float-label">
              <input
                type="email"
                id="email"
                required
              />
              <label for="email">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
            <input
              type="password"
              id="password"
              required
            />
            <label for="password">Password</label>
          </div>
            <button
              type="submit"
              class="mui-btn mui-btn--primary"
            >
              Sing in 
            </button>
          </form>
        
    `;
}
//FireBase customization
export function authWithEmailAndPassword(email, password) {
  const API_KEY = "AIzaSyDkgBjjp0aoCRCD2luNvGkp3qIa48t_KI4";
  //Promis
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => response.json())
    .then(data => data.idToken);
}
