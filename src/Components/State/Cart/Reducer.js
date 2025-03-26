import { LOGOUT } from "../Authentication/ActionTypes";
import * as actionTypes from "./ActionTypes";

const initialState = {
    cart:null,
    cartItems:[],
    loading:false,
    error:null
}

const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FIND_CART_REQUEST:
        case actionTypes.GET_ALL_CART_ITEMS_REQUEST:
        case actionTypes.UPADTE_CART_ITEM_REQUEST:
        case actionTypes.REMOVE_CART_ITEM_REQUEST:
            return {
                ...state,
                loading:true,
                error:null

            };

        case actionTypes.FIND_CART_SUCCESS:
        case actionTypes.CLEAR_CART_SUCCESS:
            console.log("Cart items stored in Redux:", action.payload);
            return {
                ...state,
                loading:false,
                cart:action.payload,
                cartItems:action.payload.item,
                
                

            };

        case actionTypes.ADD_ITEM_TO_CART_SUCCESS:
            return {
                ...state,
                loading:false,
                cartItems:[action.payload,...state.cartItems]

            };

        case actionTypes.UPADTE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading:false,
                cartItems:state.cartItems.map(
                    (item) => item.id === action.payload.id ? action.payload : item
                ),

            };

        case actionTypes.REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading:false,
                cartItems:state.cartItems.filter(
                    (item) => item.id !== action.payload
                )

            };

        case actionTypes.FIND_CART_FAILURE:
        case actionTypes.UPADTE_CART_ITEM_FAILURE:
        case actionTypes.REMOVE_CART_ITEM_FAILURE:
            return {
                ...state,
                loading:false,
                error:action.payload

            };

        case LOGOUT:
            localStorage.removeItem("jwt");
            return {
                ...state,
                cartItems:[],
                cart:null,
                success:"Logout success"
            };

        default :
        return state;

    }
}

export default cartReducer;