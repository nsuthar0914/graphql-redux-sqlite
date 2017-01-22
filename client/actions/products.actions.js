import {apiCall} from '../utils.jsx';

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
    return apiCall(payload).then(response =>
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
    return apiCall(payload).then(response =>
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
    return apiCall(payload).then(response =>
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
    return apiCall(payload).then(response =>
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
    return apiCall(payload).then(response =>
            dispatch(removeProductFinished(JSON.parse(response))))
  }
}