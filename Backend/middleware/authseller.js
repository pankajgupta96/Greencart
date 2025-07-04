 import JWT from 'jsonwebtoken';

 const authSeller = async(req,res , next) =>{
   
    const { sellerToken} = req.cookies;

    if( !sellerToken) {
        return res.json({success : false, message : 'Not Authorized'});

    }

    try{
        const tokenDecode = JWT.verify (sellerToken,process.env.JWT_SECRET)
        if( tokenDecode.email === process.env.SELLER_EMAIL){
            req.userEmail = tokenDecode.email;
            next();
        }
        else{
            return res.json({success : false ,message : "Not Authorized"});

        }
       
    }

    catch(error){
        res.json({success : false , message : error.message});
    }

 }

 export default authSeller ;




