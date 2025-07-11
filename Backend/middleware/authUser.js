 import JWT from 'jsonwebtoken'
const authUser = async ( req, res ,next) =>{
    const {token} = req.cookies;


    if( !token) {
        return res.json({success : false, message : 'Not Authorized'})
    }

    try {
         const tokenDecode = JWT.verify(token,process.env.JWT_SECRET)
         console.log("Decoded User:", tokenDecode); 
         if( tokenDecode.id){
            req.userId = tokenDecode.id;
          }
          else{
            return res.json({success : false, message : 'Not Authorized'})
          }

          next();
    } catch (error) {
         
          res.json({success:false ,message:error.message})
          
    }
} 


export default authUser;