 
//  // Place Order COD : /api/order/cod 

// import Order from "../models/Order.js";
// import Product from "../models/Product.js";

// export const placeOrderCOD = async (req, res) => {
//   try {
//     const { userId, items, address } = req.body;

//     // Validate input
//     if (!address || !items || items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Address and items are required"
//       });
//     }

//     // Calculate amount
//     let amount = 0;
//     for (const item of items) {
//       const product = await Product.findById(item.product);
//       if (!product) {
//         return res.status(404).json({
//           success: false,
//           message: `Product not found: ${item.product}`
//         });
//       }
//       amount += product.offerPrice * item.quantity;
//     }

//     // Add 2% tax
//     amount += Math.floor(amount * 0.02);

//     // Create order
//     const newOrder = await Order.create({
//       userId,
//       items,
//       address,
//       amount,
//       paymentType: "COD",
//       isPaid: false,
//       status: "Order placed"
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Order placed successfully",
//       order: newOrder
//     });

//   } catch (error) {
//     console.error("Order placement error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message
//     });
//   }
// };












// // export const getUserOrders = async (req, res) => {
// //   try {
// //     const userId = req.user?._id || req.query.userId;
// //     console.log("Fetching orders for userId:", userId); // ✅ Add this

// //     if (!userId) {
// //       return res.status(400).json({ success: false, message: "User ID is required" });
// //     }

// //     const orders = await Order.find({
// //       userId,
// //       $or: [{ paymentType: "COD" }, { isPaid: true }]
// //     }).populate("items.product address")
// //       .sort({ createdAt: -1 });

// //     res.json({ success: true, orders });
// //   } catch (error) {
// //     res.json({ success: false, message: error.message });
// //   }
// // };



// export const getUserOrders = async (req, res) => {
//   try {
//     const userId = req.query.userId; // from frontend GET request query

//     const orders = await Order.find({
//       user: userId, // ✅ This is the correct key
//       $or: [{ paymentType: "COD" }, { isPaid: true }],
//     })
//       .populate("items.product") // ✅ This is fine
//       .sort({ createdAt: -1 });

//     return res.json({ success: true, orders });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };




//   // Get All orders (for seller/amdin) : /aoi/order/seller 



//  export const getAllOrders = async(req,res)=>{
//     try {
         
    
//         const orders = await order.find({
          
//             $or: [{paymentType : "COD"} , {isPaid : true}]
        
//         }).populate("item.product address").sort({createdAt : -1})

//         res.json({success : true , orders})



//     } catch (error) {

//         res.json({success : false , message : error.message});
        
//     }
//  }








//place order cod : /api/order/cod

import Product from "../models/Product.js";
import Order from "../models/Order.js";
import stripe from "stripe";
import User from "../models/User.js";

// export const placeOrderCOD = async (req, res) => {
//   try {
//     const { userId, items, address } = req.body;
//     if ( !address ||!items.length === 0 ) {
//       return res.json({ success: false, message: "Invalid order data" });
//     }

//     //calculate amount using Items
//     let amount = 0;
//     for (const item of items) {
//       const product = await Product.findById(item.product);
      
     
//     }
//     amount += Math.floor(amount * 0.02);

//     await Order.create({
//       userId,
//       items,
//       address,
//       amount,

//       paymentType: "COD",
//     });

//     return res.json({ success: true, message: "Order placed successfully" });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };



//placeorder stripe
// export const placeOrderStripe = async (req, res) => {
//   try {
//     const { userId, items, address } = req.body;
//     const {origin} = req.headers;

//         if ( !address ||!items.length === 0 ) {
//       return res.json({ success: false, message: "Invalid order data" });
//     }
//     let product_data = [];
    

//     //calculate amount using Items
//     let amount = 0;
//     for (const item of items) {
//       const product = await Product.findById(item.product);
//       product_data.push({
//         name: product.name,
//         price:product.offerPrice,
//         quantity: item.quantity,

//       });
//     }
//     amount += Math.floor(amount * 0.02);
  


//     const order = await Order.create({
//       userId,
//       items,
//       address,
//       amount,

//       paymentType: "Online",
//     });

    //stripe gateway initialization
//     const stripeInstance = new  stripe(process.env.STRIPE_SECRET_KEY);
//    //create line items for stripe 
    
//   const line_items = product_data.map((item) =>{
//     return {
//       price_data: {
//         currency:'usd',
//         product_data:{
//           name: item.name,
        
//         },
//         unit_amount:Math.floor(item.price + item.price* 0.02) *100,
      

//       },
//       quantity: item.quantity,
//     }
//   } );

// //create session 
// const session = await stripeInstance.checkout.sessions.create({
//   line_items,
//   mode:'payment',
//   success_url:
//    `${origin}/loader?next=/my-orders`,
//    cancel_url: `${origin}/cart`,
//    metadata: {
//      orderId: order._id.toString(),
//      userId,
//     },
// })

//     return res.json({ success: true,url: session.url, message: "Order placed successfully" });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };
// //stripe webhook to verify payment : /stripe/webhook
// export const stripeWebhook = async (req, res) => {
 
//   const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
//  const sig = req.headers["stripe-signature"];
//  let event;

//  try {
//   event= stripeInstance.webhooks.constructEvent(
//     req.body,
//     sig,
//     process.env.STRIPE_WEBHOOK_SECRET
//   );

//  } catch (error) {
//   response.status(400).send(`Webhook Error: ${error.message}`);
//  }
//  //handle the event
//  switch (event.type) {

//   case "payment_intent.succeeded":{
//     const paymentIntent = event.data.object;
//   const paymentIntentId = paymentIntent.id;

//   const session = await stripeInstance.checkout.sessions.list({
//     payment_intent: paymentIntentId,
//   }) 
//   const {orderId, userId} = session.data[0].metadata;
//     //mark payment as paid 
//     await Order.findByIdAndUpdate(orderId, { isPaid: true });
    
//     await User.findByIdAndUpdate(userId,{cartItems:{}})
//     break;
//   }
//     case "payment_intent.payment_failed":{
//       const paymentIntent = event.data.object;
//   const paymentIntentId = paymentIntent.id;

//   const session = await stripeInstance.checkout.sessions.list({
//     payment_intent: paymentIntentId,
//   }) 
//   const {orderId} = session.data[0].metadata;
//   await Order.findByIdAndDelete(orderId);
//   break;
//     }
    
 
//   default:
//     console.error(`Unhandled event type: ${event.type}  `);
//     break;
//  }
//  response.json({ received: true });
// }
// get orders by user id : /api/order/user

// export const getUserOrders = async (req, res) => {
//   try {
//   const userId = req.query.userId;
//     const orders = await Order.find({
//       userId,
//       $or: [{ paymentType: "COD" }, { isPaid: true }],
//     })
//       .populate("items.product")
//       .sort({ createdAt: -1 });
//     return res.json({ success: true, orders });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };


export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid order data" });
    }

    // Calculate amount
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: `Product not found: ${item.product}` });
      }
      amount += product.offerPrice * item.quantity;
    }

    // Add tax
    amount += Math.floor(amount * 0.02);

    // Create order
    await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
      isPaid: false,
      status: "Order placed"
    });

    return res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//place order using stripe : /api/order/stripe 
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const {origin} = req.headers;

        if ( !address ||!items.length === 0 ) {
      return res.json({ success: false, message: "Invalid order data" });
    }
    let product_data = [];
    

    //calculate amount using Items
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      product_data.push({
        name: product.name,
        price:product.offerPrice,
        quantity: item.quantity,

      });
    }
    amount += Math.floor(amount * 0.02);
  


    const order = await Order.create({
      userId,
      items,
      address,
      amount,

      paymentType: "Online",
    });

    //stripe gateway initialization
    const stripeInstance = new  stripe(process.env.STRIPE_SECRET_KEY);
   //create line items for stripe 
    
  const line_items = product_data.map((item) =>{
    return {
      price_data: {
        currency:'usd',
        product_data:{
          name: item.name,
        
        },
        unit_amount:Math.floor(item.price + item.price* 0.02) *100,
      

      },
      quantity: item.quantity,
    }
  } );

//create session 
const session = await stripeInstance.checkout.sessions.create({
  line_items,
  mode:'payment',
  success_url:
   `${origin}/loader?next=/my-orders`,
   cancel_url: `${origin}/cart`,
   metadata: {
     orderId: order._id.toString(),
     userId,
    },
})

    return res.json({ success: true,url: session.url, message: "Order placed successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

  // Stripe webhook to verify payments Action :/stripe

  export const stripeWebhooks = async(request,response)=>{
    // Stripe Gateway Intialize 

    const stripeInstance = new  stripe(process.env.STRIPE_SECRET_KEY);
     
    const sig = request.headers['stripe-signature'];
    let event;
    try {
           event = stripeInstance.webhooks.constructEvent(request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
            );




    } catch (error) {

      response.status(400).send('webhook Error : $ error.message')

      
    }

    // handle the event 
    switch(event.type){
      case "payment_intent.succeeded":{
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;

        // getting session metadata
        const session = await stripeInstance.checkout.sessions.list({
          payment_intent:paymentIntentId,
        
        })

        const {orderId,userId} = session.data[0].metadata;
         
         // mark payment as paid

         await Order.findByIdAndUpdate(orderId,{isPaid:true});
        
          await User.findByIdAndUpdate(userId,{cartItems:[]}); // clear cart
         break;
      }

      case "payment_intent.payment_failed":{
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;

        const session = await stripeInstance.checkout.sessions.list({
        payment_intent:paymentIntentId,
        
        })

        const {orderId} = session.data[0].metadata;

         await Order.findByIdAndDelete(orderId);
         break;

    }

    default:
        console.error(`Unhandled webhook type: ${event.type}`);
        break;
  

  }

  response.json({recevied : true})
  }


export const getUserOrders = async (req, res) => {
  try {
    const userId = req.query.userId; // from frontend GET request query

    const orders = await Order.find({
      user: userId, // ✅ This is the correct key
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product") // ✅ This is fine
      .sort({ createdAt: -1 });

    return res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


//Get all orders(for seller/admin) : /api/order/seller

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product")
      .sort({ createdAt: -1 });
    return res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};





 