import express from "express";
import { upload } from "../configs/multer.js";
import { isSellerAuth } from "../controllers/sellerController.js";
import authSeller from "../middleware/authseller.js";
import { addProduct, changeStoke, ProductById, productList } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post('/add',upload.array(["images"]),authSeller,addProduct);
productRouter.get('/list',productList);
productRouter.get('/id',ProductById);
productRouter.post('/stock',authSeller,changeStoke);





export default productRouter;