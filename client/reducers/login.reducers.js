import Immutable from "immutable";

const immutableState = Immutable.Map({
  fetching: false,
  user: localStorage.getItem('user') ? Immutable.Map(JSON.parse(localStorage.getItem('user'))) : Immutable.Map({}),
  error: ""
})

const login = (state = immutableState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return state.set("fetching", true);
    case "LOGIN_FINISHED":
      action.response.data.login.token && localStorage.setItem('token', action.response.data.login.token);
      action.response.data.login.user && localStorage.setItem('user', JSON.stringify(action.response.data.login.user));
      if (action.response.data.login.user) {
        return state.set("fetching", false)
          .set("user", Immutable.Map(action.response.data.login.user));
      } else {
        return state.set("fetching", false)
          .set("error", "Invalid Credentials");
      }
    case "SIGNUP_REQUEST":
      return state.set("fetching", true);
    case "SIGNUP_FINISHED":
      action.response.data.signup.token && localStorage.setItem('token', action.response.data.signup.token);
      action.response.data.signup.user && localStorage.setItem('user', JSON.stringify(action.response.data.signup.user));
      if (action.response.data.signup.user) {
        return state.set("fetching", false)
          .set("user", Immutable.Map(action.response.data.signup.user));
      } else {
        return state.set("fetching", false)
          .set("error", "Could not sign up with these credentials");
      }
    case "LOGOUT":
      return state.set("user", Immutable.Map({}))
    default:
      return state
  }
}

export default login;