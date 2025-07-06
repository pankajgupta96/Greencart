import express from 'express'
import authUser from '../middleware/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/orderController.js';
import authSeller from '../middleware/authseller.js';
import Stripe from 'stripe';

const orderRouter = express.Router();



orderRouter.post('/cod' ,authUser ,placeOrderCOD);
orderRouter.post('/Stripe' ,authUser ,placeOrderStripe);
orderRouter.get('/user' ,authUser ,getUserOrders);
orderRouter.get('/seller' ,authSeller , getAllOrders);

export default orderRouter;



