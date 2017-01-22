const loginRequest = () => {
  return {
    type: "LOGIN_REQUEST"
  }
}
const loginFinished = (response) => {
  return {
    type: "LOGIN_FINISHED",
    response: response
  }
}
export const login = (payload) => {
  return dispatch => {
    dispatch(loginRequest());
    return new Promise(function(resolve, reject) {
      let request=new XMLHttpRequest();
      request.open("POST", "http://localhost:3000/graphql", true);
      request.setRequestHeader("Content-Type",
                               "application/graphql");
      request.send(payload);
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          resolve(request.responseText)
        }
      }
    }).then(response =>
            dispatch(loginFinished(JSON.parse(response))))
  }
}

const signupRequest = () => {
  return {
    type: "SIGNUP_REQUEST"
  }
}
const signupFinished = (response) => {
  return {
    type: "SIGNUP_FINISHED",
    response: response
  }
}
export const signup = (payload) => {
  return dispatch => {
    dispatch(signupRequest());
    return new Promise(function(resolve, reject) {
      let request=new XMLHttpRequest();
      request.open("POST", "http://localhost:3000/graphql", true);
      request.setRequestHeader("Content-Type",
                               "application/graphql");
      request.send(payload);
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          resolve(request.responseText)
        }
      }
    }).then(response =>
            dispatch(signupFinished(JSON.parse(response))))
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return {
    type: "LOGOUT"
  }
}