
import { api } from "../../config/api";
import { GET_RESTAURANTS_ORDER_FAILURE, GET_RESTAURANTS_ORDER_REQUEST, GET_RESTAURANTS_ORDER_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionTypes";

export const updateOrderStatusApi = ({orderId,orderStatus,jwt}) => {
    return async (dispatch) => {
        try{
            dispatch({type:UPDATE_ORDER_STATUS_REQUEST});
            const res = await api.put(`/api/admin/order/${orderId}/${orderStatus}`, {} ,{
                headers : {
                    Authorization:`Bearer ${jwt}`
                },

            });

            dispatch({type:UPDATE_ORDER_STATUS_SUCCESS,payload:res.data});
            console.log(res.data);
            
        }catch(error){

            console.log("error ", error);
            dispatch({type : UPDATE_ORDER_STATUS_FAILURE, payload:error})
            

        }
    }
}

export const fetchRestaurantsOrderApi = ({restaurantId,orderStatus,jwt}) => {
    return async (dispatch) => {
        try{
            dispatch({type:GET_RESTAURANTS_ORDER_REQUEST});
            const res = await api.get(`/api/admin/order/restaurant/${restaurantId}`,{
                params:{order_status:orderStatus},
                headers : {
                    Authorization:`Bearer ${jwt}`
                },

            });

            dispatch({type:GET_RESTAURANTS_ORDER_SUCCESS,payload:res.data});
            console.log("restaurant order --->",res.data);
            
        }catch(error){

            console.log("error ", error);
            dispatch({type : GET_RESTAURANTS_ORDER_FAILURE, payload:error})
            

        }
    }
}