import { CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE, DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, GET_MENU_ITEMS_BY_RESTAURANT_ID__FAILURE, GET_MENU_ITEMS_BY_RESTAURANT_ID__REQUEST, GET_MENU_ITEMS_BY_RESTAURANT_ID__SUCCESS, SEARCH_MENU_ITEM_FAILURE, SEARCH_MENU_ITEM_REQUEST, SEARCH_MENU_ITEM_SUCCESS, UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST, UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS } from "./ActionTypes";
import { api } from "../../config/api";


export const createMenuItemApi = ({menu,jwt}) => {
    
    return async(dispatch) => {
        dispatch({type:CREATE_MENU_ITEM_REQUEST});
        try{
            const {data} = await api.post(`/api/admin/food`,menu,{
                headers : {
                    Authorization:`Bearer ${jwt}`
                },
            });

            dispatch({type:CREATE_MENU_ITEM_SUCCESS,payload:data});
            console.log("created menu " , data);
            
        }catch(error){
            console.log("catch error " , error);
            
            dispatch({type:CREATE_MENU_ITEM_FAILURE,payload:error});

        }
    }



} 

export const getMenuItemByIdApi = (reqData) => {
    
    return async(dispatch) => {
        dispatch({type:GET_MENU_ITEMS_BY_RESTAURANT_ID__REQUEST});
        try{
            const params = new URLSearchParams();
            params.append("restaurantId", reqData.restaurantId);


            if (typeof reqData.vegitarian === "boolean") params.append("vegitarian", reqData.vegitarian);
            if (typeof reqData.nonveg === "boolean") params.append("nonveg", reqData.nonveg);
            if (typeof reqData.seasonal === "boolean") params.append("seasonal", reqData.seasonal);
            if (reqData.foodCategory) params.append("food_category", reqData.foodCategory);

            
            const {data} = await api.get(`/api/food/restaurant/${reqData.restaurantId}?${params.toString()}`,{
                headers : {
                    Authorization:`Bearer ${reqData.jwt}`
                },
            });

            dispatch({type:GET_MENU_ITEMS_BY_RESTAURANT_ID__SUCCESS,payload:data});
            console.log("from data menu item  " , data);
            
        }catch(error){
            console.log("catch error " , error);
            
            dispatch({type:GET_MENU_ITEMS_BY_RESTAURANT_ID__FAILURE,payload:error});

        }
    }



} 

export const searchMenuItemApi = ({keyword,jwt}) => {
    
    return async(dispatch) => {
        dispatch({type:SEARCH_MENU_ITEM_REQUEST});
        try{
            const {data} = await api.get(`/api/food/search?name=${keyword}`,{
                headers : {
                    Authorization:`Bearer ${jwt}`
                },
            });

            dispatch({type:SEARCH_MENU_ITEM_SUCCESS,payload:data});
            console.log("seached ", data);
            
        }catch(error){
            console.log("catch error " , error);
            
            dispatch({type:SEARCH_MENU_ITEM_FAILURE,payload:error});

        }
    }



} 

export const updateMenuItemAvailabilityApi = ({foodId,jwt}) => {
    
    return async(dispatch) => {
        dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST});
        try{
            const {data} = await api.put(`/api/admin/food/${foodId}`,{},{
                headers : {
                    Authorization:`Bearer ${jwt}`
                },
            });

            dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,payload:data});
            console.log("updated menu avail " , data);
            
        }catch(error){
            console.log("catch error " , error);
            
            dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,payload:error});

        }
    }



} 

export const deleteFoodApi = ({foodId,jwt}) => {
    
    return async(dispatch) => {
        dispatch({type:DELETE_MENU_ITEM_REQUEST});
        try{
            const {data} = await api.delete(`/api/admin/food/${foodId}`,{
                headers : {
                    Authorization:`Bearer ${jwt}`
                },
            });

            dispatch({type:DELETE_MENU_ITEM_SUCCESS,payload:foodId});
            console.log("deleted food item " , data);
            
        }catch(error){
            console.log("catch error " , error);
            
            dispatch({type:DELETE_MENU_ITEM_FAILURE,payload:error});

        }
    }



} 
