import express from 'express'
import authUser from '../middleware/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD } from '../controllers/orderController.js';
import authSeller from '../middleware/authseller.js';

const orderRouter = express.Router();



orderRouter.post('/cod' ,authUser ,placeOrderCOD);
orderRouter.get('/cod/user' ,authUser ,getUserOrders);
orderRouter.get('/seller' ,authSeller , getAllOrders);

export default orderRouter;



