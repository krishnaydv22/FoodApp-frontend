import { api } from "../../config/api";
import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_EVENTS_FAILURE, CREATE_EVENTS_REQUEST, CREATE_EVENTS_SUCCESS, CREATE_RESTAURANT_FAILURE, CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, DELETE_EVENTS_FAILURE, DELETE_EVENTS_REQUEST, DELETE_EVENTS_SUCCESS, DELETE_RESTAURANT_FAILURE, DELETE_RESTAURANT_REQUEST, DELETE_RESTAURANT_SUCCESS, GET_ALL_EVENTS_FAILURE, GET_ALL_EVENTS_REQUEST, GET_ALL_EVENTS_SUCCESS, GET_ALL_RESTAURANTS_FAILURE, GET_ALL_RESTAURANTS_REQUEST, GET_ALL_RESTAURANTS_SUCCESS, GET_RESTAURANT_BY_ID_FAILURE, GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS, GET_RESTAURANT_BY_USER_ID_FAILURE, GET_RESTAURANT_BY_USER_ID_REQUEST, GET_RESTAURANT_BY_USER_ID_SUCCESS, GET_RESTAURANTS_CATEGORY_FAILURE, GET_RESTAURANTS_CATEGORY_REQUEST, GET_RESTAURANTS_CATEGORY_SUCCESS, GET_RESTAURANTS_EVENTS_FAILURE, GET_RESTAURANTS_EVENTS_REQUEST, GET_RESTAURANTS_EVENTS_SUCCESS, UPDATE_RESTAURANT_FAILURE, UPDATE_RESTAURANT_REQUEST, UPDATE_RESTAURANT_STATUS_FAILURE, UPDATE_RESTAURANT_STATUS_REQUEST, UPDATE_RESTAURANT_STATUS_SUCCESS, UPDATE_RESTAURANT_SUCCESS } from "./ActionTypes"
// import { api, API_URL } from "../../config/api";


export const getAllRestaurantsApi = (jwt) => {
    return async(dispatch) => {
        dispatch({type:GET_ALL_RESTAURANTS_REQUEST});
        try{
            const { data } = await api.get("/api/restaurants",{
                headers : {
                    Authorization:`Bearer ${jwt}`
                },
            });

            dispatch({type:GET_ALL_RESTAURANTS_SUCCESS,payload:data});
            console.log("all restaurant " , data);
            
        }catch(error){
            console.log("catch error " , error);
            
            dispatch({type:GET_ALL_RESTAURANTS_FAILURE,payload:error});

        }
    }



} 

export const getRestaurantByIdApi = (reqData) => {
    return async(dispatch) => {
        dispatch({type:GET_RESTAURANT_BY_ID_REQUEST});
        try{
            const response = await api.get(`/api/restaurants/${reqData.restaurantId}`,{
                headers : {
                    Authorization:`Bearer ${reqData.jwt}`
                },
            });

            dispatch({type:GET_RESTAURANT_BY_ID_SUCCESS,payload:response.data});
            console.log("getRstarant by id " , response.data);
            
        }catch(error){
            console.log("catch error " , error);
            
            dispatch({type:GET_RESTAURANT_BY_ID_FAILURE,payload:error});

        }
    }



} 

export const getRestaurantByUserIdApi = (jwt) => {
    return async(dispatch) => {
        dispatch({type:GET_RESTAURANT_BY_USER_ID_REQUEST});
        try{
            const {data} = await api.get(`/api/admin/restaurants/user`,{
                headers : {
                    Authorization:`Bearer ${jwt}`
                },
            });
           console.log("get restaurant by user id ", data);
           
            dispatch({type:GET_RESTAURANT_BY_USER_ID_SUCCESS,payload:data});
            console.log("getRstarant by user id " , data);
            
        }catch(error){
            console.log("catch error " , error);
            
            dispatch({type:GET_RESTAURANT_BY_USER_ID_FAILURE,payload:error});

        }
    }



} 

export const createRestaurantApi = (reqData) => {
    console.log("jwt-------------",reqData.jwt);
    
    return async(dispatch) => {
        dispatch({type:CREATE_RESTAURANT_REQUEST});
        try{
            const {data} = await api.post(`/api/admin/restaurants`,reqData.data,{
                headers : {
                    Authorization:`Bearer ${reqData.jwt}`
                },
            });

            dispatch({type:CREATE_RESTAURANT_SUCCESS,payload:data});
            console.log("created restaurant " , data);
            
        }catch(error){
            console.log("catch error " , error);
            
            dispatch({type:CREATE_RESTAURANT_FAILURE,payload:error});

        }
    }



} 

export const updateRestaurantApi = ({restaurantId,restaurantData,jwt}) => {
    
    return async(dispatch) => {
        dispatch({type:UPDATE_RESTAURANT_REQUEST});
        try{
            const {data} = await api.put(`/api/admin/restuarant/${restaurantId}`,restaurantData,{
                headers : {
                    Authorization:`Bearer ${jwt}`
                },
            });

            dispatch({type:UPDATE_RESTAURANT_SUCCESS,payload:data});
            console.log("updated restaurant " , data);
            
        }catch(error){
            console.log("catch error " , error);
            
            dispatch({type:UPDATE_RESTAURANT_FAILURE,payload:error});

        }
    }



} 

export const deleteRestaurantApi = ({restaurantId,jwt}) => {
    
    return async(dispatch) => {
        dispatch({type:DELETE_RESTAURANT_REQUEST});
        try{
            const {data} = await api.delete(`/api/admin/restuarant/${restaurantId}`,{
                headers : {
                    Authorization:`Bearer ${jwt}`
                },
            });

            dispatch({type:DELETE_RESTAURANT_SUCCESS,payload:restaurantId});
            console.log("deleted restaurant " , data);
            
            
        }catch(error){
            console.log("catch error " , error);
            
            dispatch({type:DELETE_RESTAURANT_FAILURE,payload:error});

        }
    }



} 


export const updateRestaurantStatusApi = ({restaurantId,jwt}) => {
    
    return async(dispatch) => {
        dispatch({type:UPDATE_RESTAURANT_STATUS_REQUEST});
        try{
            const {data} = await api.put(`/api/admin/restaurants/${restaurantId}/status`,{},{
                headers : {
                    Authorization:`Bearer ${jwt}`
                },
            });

            dispatch({type:UPDATE_RESTAURANT_STATUS_SUCCESS,payload:data});
            console.log("updated status " , data);
            
            
        }catch(error){
            console.log("catch error " , error);
            
            dispatch({type:UPDATE_RESTAURANT_STATUS_FAILURE,payload:error});

        }
    }



} 


export const createEventApi = ({data,restaurantId,jwt}) => {
    
    return async(dispatch) => {
        dispatch({type:CREATE_EVENTS_REQUEST});
        try{
            const res = await api.post(`/api/admin/events/restaurant/${restaurantId}`,data,{
                headers : {
                    Authorization:`Bearer ${jwt}`
                },
            });

            dispatch({type:CREATE_EVENTS_SUCCESS,payload:res.data});
            console.log("created event " , res.data);
            
            
        }catch(error){
            console.log("catch error " , error);
            
            dispatch({type:CREATE_EVENTS_FAILURE,payload:error});

        }
    }



} 

export const getAllEventsApi = ({jwt}) => {
    
    return async(dispatch) => {
        dispatch({type:GET_ALL_EVENTS_REQUEST});
        try{
            const res = await api.get(`/api/events`,{
                headers : {
                    Authorization:`Bearer ${jwt}`
                },
            });

            dispatch({type:GET_ALL_EVENTS_SUCCESS,payload:res.data});
            console.log("All events " , res.data);
            
            
        }catch(error){
            console.log("catch error " , error);
            
            dispatch({type:GET_ALL_EVENTS_FAILURE,payload:error});

        }
    }



} 

export const deleteEventApi = ({eventId,jwt}) => {
    
    return async(dispatch) => {
        dispatch({type:DELETE_EVENTS_REQUEST});
        try{
            const res = await api.delete(`/api/admin/events/${eventId}`,{
                headers : {
                    Authorization:`Bearer ${jwt}`
                },
            });

            dispatch({type:DELETE_EVENTS_SUCCESS,payload:eventId});
            console.log("deleted events " , res.data);
            
            
        }catch(error){
            console.log("catch error " , error);
            
            dispatch({type:DELETE_EVENTS_FAILURE,payload:error});

        }
    }



} 

export const getRestaurantsEventApi = ({restaurantId,jwt}) => {
    
    return async(dispatch) => {
        dispatch({type:GET_RESTAURANTS_EVENTS_REQUEST});
        try{
            const res = await api.get(`/api/admin/events/restaurant/${restaurantId}`,{
                headers : {
                    Authorization:`Bearer ${jwt}`
                },
            });

            dispatch({type:GET_RESTAURANTS_EVENTS_SUCCESS,payload:res.data});
            console.log("Restaurant Events " , res.data);
            
            
        }catch(error){
            console.log("catch error " , error);
            
            dispatch({type:GET_RESTAURANTS_EVENTS_FAILURE,payload:error});

        }
    }



} 

export const createCategoryApi = ({reqData,jwt}) => {
    
    return async(dispatch) => {
        dispatch({type:CREATE_CATEGORY_REQUEST});
        try{
            const res = await api.post(`/api/admin/category`,reqData,{
                headers : {
                    Authorization:`Bearer ${jwt}`
                },
            });

            dispatch({type:CREATE_CATEGORY_SUCCESS,payload:res.data});
            console.log("created category " , res.data);
            
            
        }catch(error){
            console.log("catch error " , error);
            
            dispatch({type:CREATE_CATEGORY_FAILURE,payload:error});

        }
    }



} 

export const getRestaurantsCategoryApi = ({jwt,restaurantId}) => {
    
    return async(dispatch) => {
        dispatch({type:GET_RESTAURANTS_CATEGORY_REQUEST});
        try{
            const res = await api.get(`/api/category/restaurant/${restaurantId}`,{
                headers : {
                    Authorization:`Bearer ${jwt}`
                },
            });

            dispatch({type:GET_RESTAURANTS_CATEGORY_SUCCESS,payload:res.data});
            console.log("get restaurant category " , res.data);
            
            
        }catch(error){
            console.log("catch error " , error);
            
            dispatch({type:GET_RESTAURANTS_CATEGORY_FAILURE,payload:error});

        }
    }



} 