const getProductsRequest = () => {
  return {
    type: "GET_PRODUCTS_REQUEST"
  }
}
const getProductsFinished = (response) => {
  return {
    type: "GET_PRODUCTS_FINISHED",
    response: response
  }
}
export const getProducts = (payload) => {
  return dispatch => {
    dispatch(getProductsRequest());
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
            dispatch(getProductsFinished(JSON.parse(response))))
  }
}


const getProductRequest = () => {
  return {
    type: "GET_PRODUCT_REQUEST"
  }
}
const getProductFinished = (response) => {
  return {
    type: "GET_PRODUCT_FINISHED",
    response: response
  }
}
export const getProduct = (payload) => {
  return dispatch => {
    dispatch(getProductRequest());
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
            dispatch(getProductFinished(JSON.parse(response))))
  }
}