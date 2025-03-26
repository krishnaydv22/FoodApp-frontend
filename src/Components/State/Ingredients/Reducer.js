
import * as actionType from './ActionTypes'

const initialState = {
    ingredients:[],
    update:null,
    category:[],
    error:null
}

const ingredientReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.GET_INGREDIENTS_REQUEST:
        case actionType.UPDATE_STOCK_REQUEST:
        case actionType.CREATE_INGREDIENT_CATEGORY_REQUEST:
        case actionType.CREATE_INGREDIENT_REQUEST:
        case actionType.GET_INGREDIENT_CATEGORY_REQUEST:
            return {
                ...state,
                loading:true,
                error:null

            };

        case actionType.GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients:action.payload,
                error:null

            };

            case actionType.GET_INGREDIENT_CATEGORY_SUCCESS:
                return {
                    ...state,
                    category:action.payload,
                    error:null
    
                };

            case actionType.CREATE_INGREDIENT_CATEGORY_SUCCESS:
                    return {
                        ...state,
                        category:[...state.category,action.payload],
                        error:null
        
                };

            case actionType.CREATE_INGREDIENT_SUCCESS:
                return {
                        ...state,
                        ingredients:[...state.ingredients,action.payload],
                        error:null
        
                };

            case actionType.UPDATE_STOCK_SUCCESS:
                return {
                        ...state,
                        update:action.payload,
                        ingredients:state.ingredients.map((item) => 
                        item.id === action.payload.id ? action.payload : item),
                        error:null
            
                    };

            default:
                return state;
    




    
    }
}

export default ingredientReducer;