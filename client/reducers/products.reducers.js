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
    case "ADD_PRODUCT_REQUEST":
      return state.set("fetching", true);
    case "ADD_PRODUCT_FINISHED":
      return state.set("fetching", false)
             .set("product", Immutable.Map(action.response.data.addProduct));
    case "EDIT_PRODUCT_REQUEST":
      return state.set("fetching", true);
    case "EDIT_PRODUCT_FINISHED":
      return state.set("fetching", false)
             .set("product", Immutable.Map(action.response.data.addProduct));
    case "REMOVE_PRODUCT_REQUEST":
      return state.set("fetching", true);
    case "REMOVE_PRODUCT_FINISHED":
      return state.set("fetching", false)
             .set("products", action.response.data.removeProduct);
    default:
      return state
  }
}

export default products;