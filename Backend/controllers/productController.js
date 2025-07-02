// add Product : /api/product/add

import { v2 as cloudinary} from "cloudinary"
import Product from "../models/Product";


export const addProduct = async (req,res)=>{

    try {
        let productData = JSON.parse(req.body.productData);
    const images = req.files

    let imageUrl = await Promise.all(
        images.map(async (item)=>{
            let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
            return result.secure_url

        })
    )

    await Product.create({
        ...productData,image : imageUrl
    })

    res.json({success:true ,message : "product Added"})

    } catch (error) {
        console.log(error.message);
        res.json({success:false ,message :error.message});
        
    }

}

// get Product : /api/product/list

export const productList = async ( req,res) =>{

    try {
        const products = await Product.find({})
        res.json({success:true.products})
    } catch (error) {
       console.log(error.message);
        res.json({success:false ,message :error.message}); 
    }

}

// Get single product : /api/product/id

export const ProductById = async ( req,res) =>{
    try {
        const {id} = req.body
        const product = await Product.findById(id)
        res.json({success:true,product})
    } catch (error) {
        console.log(error.message);
        res.json({success:false ,message :error.message}); 
        
    }

}


// Get  product inStock : /api/product/stock

export const changeStoke = async ( req,res) =>{

    try {
        const {id, inStock} = req.body
        await Product.findByIdAndUpdate(id,{inStock})
        res.json({success : true,message : error.message})
     } catch (error) {
        console.log(error.message);
        res.json({success:false ,message :error.message}); 
        
    }

}