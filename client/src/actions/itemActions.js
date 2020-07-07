import { GET_ITEMS_REQUEST, ADD_ITEM_REQUEST, ITEMS_LOADING, DELETE_ITEM_REQUEST } from './types'
import axios from 'axios'
import { tokenConfig } from './authActions'
import  { returnErrors } from  './errorActions'

export const getItems = () => dispatch => {
    dispatch(setItemsLoading())
    axios.get('/api/items')
    .then(res => dispatch(getItemsRequest(res.data)))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

const getItemsRequest = items => {
    return {
        type : GET_ITEMS_REQUEST,
        payload : items
    }
}

export const deleteItem = id => (dispatch, getState) => {
    dispatch(setItemsLoading())
    axios.delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res => dispatch(deleteItemRequest(id)))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}
const deleteItemRequest = id => {
    return {
        type : DELETE_ITEM_REQUEST,
        payload : id
    }
}

export const addItem = item => (dispatch, getState) => {
    dispatch(setItemsLoading())
    axios.post('/api/items',item, tokenConfig(getState))
    .then(res => dispatch(addItemRequest(res.data)))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}
const addItemRequest = item => {
    return {
        type : ADD_ITEM_REQUEST,
        payload : item
    }
}

export const setItemsLoading = () => {
    return {
        type : ITEMS_LOADING
    }
}