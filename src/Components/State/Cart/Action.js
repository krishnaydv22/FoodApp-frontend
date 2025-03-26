import { api } from "../../config/api";
import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, CLEAR_CART_FAILURE, CLEAR_CART_REQUEST, CLEAR_CART_SUCCESS, FIND_CART_FAILURE, FIND_CART_REQUEST, FIND_CART_SUCCESS, GET_ALL_CART_ITEMS_FAILURE, GET_ALL_CART_ITEMS_REQUEST, GET_ALL_CART_ITEMS_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPADTE_CART_ITEM_FAILURE, UPADTE_CART_ITEM_REQUEST, UPADTE_CART_ITEM_SUCCESS } from "./ActionTypes";

export const findCartApi = (jwt) =>{
    return async(dispatch) =>{
        dispatch({type:FIND_CART_REQUEST});
        try{
            const {data} = await api.get("/api/cart",{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            })
            console.log("my cart" , data);
            dispatch({type:FIND_CART_SUCCESS,payload:data})
            
            

        }catch(error){
            console.log("error" , error);
            dispatch({type:FIND_CART_FAILURE, payload:error})
            
        }
    }



}

export const getAllCartItemsApi = (reqData) =>{
    return async(dispatch) =>{
        dispatch({type:GET_ALL_CART_ITEMS_REQUEST});
        try{
            const {data} = await api.get(`/api/carts/${reqData.cartId}/items`,{
                headers:{
                    Authorization:`Bearer ${reqData.jwt}`
                }
            })

            dispatch({type:GET_ALL_CART_ITEMS_SUCCESS,payload:data})

        }catch(error){
            console.log("error" , error);
            dispatch({type:GET_ALL_CART_ITEMS_FAILURE, payload:error})
            
        }
    }



}

export const addItemToCartApi = (reqData) =>{
    return async(dispatch) =>{
        dispatch({type:ADD_ITEM_TO_CART_REQUEST});
        try{
            const {data} = await api.put(`/api/cart/add`,reqData.cartItem,{
                headers:{
                    Authorization:`Bearer ${reqData.jwt}`
                }
            })
            console.log(reqData.cartItem);
            
            console.log("added to cart ", data);
            
            dispatch({type:ADD_ITEM_TO_CART_SUCCESS,payload:data})

        }catch(error){
            console.log("error" , error);
            dispatch({type:ADD_ITEM_TO_CART_FAILURE, payload:error.message})
            
        }
    }



}

export const upadateCartItemApi = (reqData) =>{
    return async(dispatch) =>{
        dispatch({type:UPADTE_CART_ITEM_REQUEST});
        try{
            const {data} =await api.put(`/api/cart-item/update`,reqData.data,{
                headers:{
                    Authorization:`Bearer ${reqData.jwt}`
                }
            })
            console.log("added to cart ", data);
            
            dispatch({type:UPADTE_CART_ITEM_SUCCESS,payload:data})

        }catch(error){
            console.log("error" , error);
            dispatch({type:UPADTE_CART_ITEM_FAILURE, payload:error.message})
            
        }
    }



}

export const removeCartItemApi = ({cartItemId,jwt}) =>{
    return async(dispatch) =>{
        dispatch({type:REMOVE_CART_ITEM_REQUEST});
        try{
            const {data} =await api.delete(`/api/cart-item/${cartItemId}/remove`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            })
            console.log("removed ", data);
            
            dispatch({type:REMOVE_CART_ITEM_SUCCESS,payload:cartItemId})

        }catch(error){
            console.log("error" , error);
            dispatch({type:REMOVE_CART_ITEM_FAILURE, payload:error.message})
            
        }
    }



}

export const clearCartApi = () =>{
    return async(dispatch) =>{
        dispatch({type:CLEAR_CART_REQUEST});
        try{
            const {data} =await api.put(`/api/cart/clear`,{},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("jwt")}`
                }
            });
            console.log("clear cart ", data);
            
            dispatch({type:CLEAR_CART_SUCCESS,payload:data})

        }catch(error){
            console.log("error" , error);
            dispatch({type:CLEAR_CART_FAILURE, payload:error.message})
            
        }
    }



}
