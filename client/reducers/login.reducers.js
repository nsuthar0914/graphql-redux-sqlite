import Immutable from "immutable";

const immutableState = Immutable.Map({
  fetching: false,
  user: localStorage.getItem('user') ? Immutable.Map(JSON.parse(localStorage.getItem('user'))) : Immutable.Map({}),
  error: null
})

const login = (state = immutableState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return state.set("fetching", true)
        .set("error", null);
    case "LOGIN_FINISHED":
      if (action.response.data.login && action.response.data.login.user) {
        action.response.data.login.token && localStorage.setItem('token', action.response.data.login.token);
        localStorage.setItem('user', JSON.stringify(action.response.data.login.user));
        return state.set("fetching", false)
          .set("user", Immutable.Map(action.response.data.login.user));
      } else {
        return state.set("fetching", false)
          .set("error", "Invalid Credentials");
      }
    case "SIGNUP_REQUEST":
      return state.set("fetching", true)
        .set("error", null);
    case "SIGNUP_FINISHED":
      if (action.response.data.signup && action.response.data.signup.user) {
        action.response.data.signup.token && localStorage.setItem('token', action.response.data.signup.token);
        localStorage.setItem('user', JSON.stringify(action.response.data.signup.user));
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