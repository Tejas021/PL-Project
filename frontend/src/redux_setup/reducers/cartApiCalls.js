import { addProducts,initializeCart,clearCartItems } from "./cartRedux";

import { userRequest } from "../../components/axios";

export const addToCart=async(data,user,dispatch)=>{
 
    const {_id,title,...others}=data

    const CartProduct= await userRequest.post(`/cart/${user._id}`,{...others,name:title},{withCredentials:true})

    dispatch(addProducts(CartProduct.data))

}


export const getCartItems=async(dispatch,user)=>{

    const cartItems=await userRequest.get(`/cart/${user._id}`,{withCredentials:true})
   
    dispatch(initializeCart({products:cartItems.data}))
}

export const clearCart=async(dispatch,user)=>{

     await userRequest.post(`/cart/clearCart/${user._id}`,{userId:user._id},{withCredentials:true})

    dispatch(clearCartItems())
}



// export const clearCart=async(user,dispatch)=>{
//     console.log("Calling deleting")
//     // const response = await userRequest.post(`/cart/clearCart/${user._id}`,{userId:user._id},{withCredentials:true})
//         dispatch(clearCart())
    
// }