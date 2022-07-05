import { Link, useHistory } from "react-router-dom";
import { useState } from 'react';
import * as auth from "../utils/auth";


function Register({onRegister}) {
  const [userAuthData, setUserAuthData] = useState({email: '', password: ''});
  const history = useHistory();

  function handleChange(e) {
    const {name, value} = e.target;
    setUserAuthData({...userAuthData, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = userAuthData;
    auth.register(email, password)
      .then((res) => {
        if(res._id) {
          history.push('/signin');
          onRegister(false);
        }
      })
      .catch(() => {
        onRegister(true);
        setUserAuthData({email: '', password: ''})
      })
  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h4 className="register__form-name">Регистрация</h4>
      <input
        name="email"
        className="register__form-field"
        type="email"
        id="authEmail"
        required
        placeholder="Email"
        value={userAuthData.email}
        onChange={handleChange}
      />
      <input
        name="password"
        className="register__form-field"
        type="password"
        id="authPassword"
        required
        placeholder="Пароль"
        value={userAuthData.password}
        onChange={handleChange}
      />
      <button className="register__submit-btn">Зарегистрироваться</button>
      <p className="register__span-login">Уже зарегистрированы? <Link to="/signin" className="register__link">Войти</Link></p>
    </form>
  )
}

export default Register;
