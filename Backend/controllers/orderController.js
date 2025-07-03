 
 // Place Order COD : /api/order/cod 

import order from "../models/Order.js";
import Product from "../models/Product.js";

 export const placeOrderCOD = async(req,res)=>{
    try {
        const{userId ,items , address} = req.bosy;
        if(!address || items.length == 0){
            return res.json({success :false , message :"Invalid data"})

            // calculate Amout Using Items

            let amount = await items.reduce(async(acc,item) =>{
                const product = await Product.findById(item.product);
                return (await acc) + product.offerPrice*item.quantity
            },0)

            // add tax charge (2%)

            amount += Math.floor(amount *0.02);
            await order.create ({
                userId,
                items,
                amount,
                address,
                paymentType :"COD"
            });


            return res.json({success : true , message : " Order Placed Successfully"})



        }
        
    } catch (error) {
        return res.json({ success : false , message : error.message
        })
        
    }
 }


 //Get Orders by User Id : /api/order/user


 export const getUserOrders = async(req,res)=>{
    try {
         
        const {userId} = req.body;
        const orders = await order.find({
            userId,
            $or: [{paymentType : "COD"} , {isPaid : true}]
        
        }).populate("item.product address").sort({createdAt: -1});

        res.json({success : true , orders})



    } catch (error) {

        res.json({success : false , message : error.message})
        
    }
 }


  // Get All orders (for seller/amdin) : /aoi/order/seller 



 export const getAllOrders = async(req,res)=>{
    try {
         
    
        const orders = await order.find({
          
            $or: [{paymentType : "COD"} , {isPaid : true}]
        
        }).populate("item.product address").sort({createdAt : -1})

        res.json({success : true , orders})



    } catch (error) {

        res.json({success : false , message : error.message});
        
    }
 }









 