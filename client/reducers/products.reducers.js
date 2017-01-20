import Immutable from "immutable";

const immutableState = Immutable.Map({
  fetching: false,
  products: [],
  product: Immutable.Map({})
})

const products = (state = immutableState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS_REQUEST":
      return state.set("fetching", true);
    case "GET_PRODUCTS_FINISHED":
      return state.set("fetching", false)
             .set("products", action.response.data.products);
    case "GET_PRODUCT_REQUEST":
      return state.set("fetching", true);
    case "GET_PRODUCT_FINISHED":
      return state.set("fetching", false)
             .set("product", Immutable.Map(action.response.data.product));
    case "ADD_PRODUCTS_REQUEST":
      return state.set("fetching", true);
    case "ADD_PRODUCTS_FINISHED":
      return state.set("fetching", false)
             .set("products", action.response.data.products);
    case "EDIT_PRODUCTS_REQUEST":
      return state.set("fetching", true);
    case "EDIT_PRODUCTS_FINISHED":
      return state.set("fetching", false)
             .set("products", action.response.data.products);
    case "REMOVE_PRODUCTS_REQUEST":
      return state.set("fetching", true);
    case "REMOVE_PRODUCTS_FINISHED":
      return state.set("fetching", false)
             .set("products", action.response.data.products);
    default:
      return state
  }
}

export default products;