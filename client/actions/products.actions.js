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
      let token = localStorage.getItem('token')
      if (token) {
        console.log(token);
        request.setRequestHeader("Authorization", `Bearer ${token}`)
        console.log(request);
      }
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

const addProductRequest = () => {
  return {
    type: "ADD_PRODUCT_REQUEST"
  }
}
const addProductFinished = (response) => {
  return {
    type: "ADD_PRODUCT_FINISHED",
    response: response
  }
}
export const addProduct = (payload) => {
  return dispatch => {
    dispatch(addProductRequest());
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
            dispatch(addProductFinished(JSON.parse(response))))
  }
}

const editProductRequest = () => {
  return {
    type: "EDIT_PRODUCT_REQUEST"
  }
}
const editProductFinished = (response) => {
  return {
    type: "EDIT_PRODUCT_FINISHED",
    response: response
  }
}
export const editProduct = (payload) => {
  return dispatch => {
    dispatch(editProductRequest());
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
            dispatch(editProductFinished(JSON.parse(response))))
  }
}

const removeProductRequest = () => {
  return {
    type: "REMOVE_PRODUCT_REQUEST"
  }
}
const removeProductFinished = (response) => {
  return {
    type: "REMOVE_PRODUCT_FINISHED",
    response: response
  }
}
export const removeProduct = (payload) => {
  return dispatch => {
    dispatch(removeProductRequest());
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
            dispatch(removeProductFinished(JSON.parse(response))))
  }
}