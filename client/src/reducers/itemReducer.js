import { GET_ITEMS_REQUEST, ADD_ITEM_REQUEST, DELETE_ITEM_REQUEST, ITEMS_LOADING } from '../actions/types'

const initialState = {
    items : [],
     loading :false
}

const itemReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ITEMS_REQUEST:
            return {
                ...state,
                items : action.payload,
                loading : false
            }
        case DELETE_ITEM_REQUEST:
            return {
                ...state,
                items : state.items.filter(item => item._id !== action.payload),
                loading: false
            }
        case ADD_ITEM_REQUEST:
            return {
                ...state,
                items : [action.payload, ...state.items],
                loading : false
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading : true
            }
        default: 
            return state
    }
}

export default itemReducer