import Immutable from "immutable";

const immutableState = Immutable.Map({
  fetching: false,
  products: []
})

const products = (state = immutableState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS_REQUEST":
      return state.set("fetching", true);
    case "GET_PRODUCTS_FINISHED":
      return state.set("fetching", false)
             .set("products", action.response.data.products);
    default:
      return state
  }
}

export default products;