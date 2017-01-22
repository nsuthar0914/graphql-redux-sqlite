import Immutable from "immutable";

const immutableState = Immutable.Map({
  fetching: false,
  user: Immutable.Map({})
})

const login = (state = immutableState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return state.set("fetching", true);
    case "LOGIN_FINISHED":
      localStorage.setItem('token', action.response.data.login.token);
      return state.set("fetching", false)
             .set("user", Immutable.Map({
              email: action.response.data.login.email
             }));
    default:
      return state
  }
}

export default login;