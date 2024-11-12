var jwt = require('jsonwebtoken');

const generateToken=(userData)=>{
    // int this function we are creating new fresh jwt token to provide user , for LOgin/Session management or for authourise purpose
    return jwt.sign(userData,process.env.PRIVATE_KEY)
}

const validateJwtToken = (req,res,next)=>{
    //first  we are checking that JWT toekn is available or not 
    const authourization = req.header.authourization;
    //output : 1. Bearer qwertyuio
    //output : 2. qwertyuio
    //output : 3. (empty string)
    //output : 4. TOKEN BANA HI NAHI H LOCAL ho ya ENDPOINT TESTING SE BHEJA HO < WITHOUT TOKEN HEADDER SEND KARA H

    if(!authourization){
        return res.status(401).json
        ({err:'Token not available'})
    }


    //we are storing the token value 
    const token = req.header.authourization.split(' ')[1]

    //token provided is wrong 
    if(!token){
        return res.status(401).json
        ({err:'Unauthorized User'});
    }


    try{
        //int this error  handling try catch : we are handling , if token is validated or verified , then move to next middleware or respond back to client
        const validateToken = jwt.verify(token,process.env.PRIVATE_KEY);
        
        req.user=validateToken;
        next();
    }
    catch(err){
        console.error("ERROR OCCURED : " , err.message);
    }

}

module.exports = {generateToken,validateJwtToken}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            