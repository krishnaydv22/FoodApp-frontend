
import * as actionTypes from './ActionTypes'

const initialState = {
    loading:false,
    orders:[],
    error:null,

}

const orderReducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.GET_USER_ORDERS_REQUEST:
            return {
                ...state,
                error:null,
                loading:true
            };
        case actionTypes.GET_USER_ORDERS_SUCCESS:
            return {
                ...state,
                error:null,
                loading:false,
                orders:action.payload,
            };

        case actionTypes.GET_USER_ORDERS_FAILURE:
            return {
                ...state,
                error:action.payload,
                loading:false,
                
            };

        default:
            return state;



        
    }

}

export default orderReducer;