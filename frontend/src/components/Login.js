import { useHistory } from "react-router-dom";
import { useState } from "react";
import * as auth from "../utils/auth";

function Login({handleLogin, onFail}) {
  const [userData, setUserData] = useState({ password: '', email: ''  });
  const history = useHistory();

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const {password, email} = userData;
    auth.login(password, email)
      .then((data) => {
        if (data.token) {
          setUserData({password: '', email: ''});
          handleLogin(userData.email);
          history.push('/')
        } else if (data.message || data.error) {
          onFail(true);
        }
      })
  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h4 className="register__form-name">Вход</h4>
      <input
        name="email"
        className="register__form-field"
        type="email"
        id="authEmail"
        required
        placeholder="Email"
        value={userData.email || ""}
        onChange={handleChange}
      />
      <input
        name="password"
        className="register__form-field"
        type="password"
        id="authPassword"
        required
        placeholder="Пароль"
        value={userData.password || ""}
        onChange={handleChange}
      />
      <button className="register__submit-btn">Войти</button>
    </form>
  )
}

export default Login;
