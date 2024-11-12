const jwt = require ('jsonwebtoken');

const createToken = jwt.sign(payload,process,env.PRIVATE_KEY,(err,token)=>{
    if(err){
        console.error("INVALID: ",err.message)
    }
    else{
        console.log(token);
    }
})

const validateToken = jwt.verify(token,process.env.PRIVATE_KEY);

//verify a toekn Symmetric
jwt.verify(token,process.env.PRIVATE_KEY,function(err,decoded){
    console.log(decoded.foo)
});

//invalid token - synchronous
try{
    var decoded = jwt.verify(toekn,'wrong-secret');
}
catch{
    
}