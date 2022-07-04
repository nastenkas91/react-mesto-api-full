export const BASE_URL = 'https://auth.nomoreparties.co'

export const register = ( email, password ) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res
    })
    .catch(err => console.log(err))
}

export const login = ( password, email  ) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email})
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      } else {
        return data;
      }
    })
    .catch(err => console.log(err))
}

export const tokenCheck = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}
