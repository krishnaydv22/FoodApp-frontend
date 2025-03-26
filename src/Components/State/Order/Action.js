import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USER_ORDERS_FAILURE, GET_USER_ORDERS_REQUEST, GET_USER_ORDERS_SUCCESS } from "./ActionTypes";
import { api } from "../../config/api";



export const createOrderApi = (reqData) => {
    
    return async(dispatch) => {
        dispatch({type:CREATE_ORDER_REQUEST});
        try{
            const {data} = await api.post(`/api/order`,reqData.order,{
                headers : {
                    Authorization:`Bearer ${reqData.jwt}`
                },
            });

            if(data.payment_url){
                window.location.href=data.payment_url;
            }

            dispatch({type:CREATE_ORDER_SUCCESS,payload:data});
            console.log("created order " , data);
            
        }catch(error){
            console.log("catch error " , error);
            
            dispatch({type:CREATE_ORDER_FAILURE,payload:error});

        }
    }



} 

export const getUsersOrderApi = (jwt) => {
    
    return async(dispatch) => {
        dispatch({type:GET_USER_ORDERS_REQUEST});
        try{
            const {data} = await api.get(`/api/order/user`,{
                headers : {
                    Authorization:`Bearer ${jwt}`
                },
            });

            dispatch({type:GET_USER_ORDERS_SUCCESS,payload:data});
            console.log("user orders " , data);
            
        }catch(error){
            console.log("catch error " , error);
            
            dispatch({type:GET_USER_ORDERS_FAILURE,payload:error});

        }
    }



} 