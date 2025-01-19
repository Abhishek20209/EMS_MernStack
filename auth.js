const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth=(req,res,next)=>{
    try{

        const token=req.cookies.token;

        console.log("token=",token);

        try{

            const payload=jwt.verify(token,process.env.JWT_SECRET);

            console.log("PAYLOAD at authentication =",payload);

        }catch(error)
        {
            return res.status(501).json({
                success:false,
                message:"invalid token",
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            error:error,
            message:"error occured while authentication"
        })
    }
}

exports.isAdmin=(req,res,next)=>{
    try{

        const token=req.cookies.token;

        console.log("token at isAdmin=",token);

        try{

            const payload=jwt.verify(token,process.env.JWT_SECRET);

            if(payload.role!=="admin"){

                return res.status(401).json({
                    success:false,
                    message:"you are not an admin"
                })
            }

        }catch(error)
        {
            return res.status(501).json({
                success:false,
                message:"invalid token",
            });
        }
        next();
        

    }catch(error){
        return res.status(501).json({
            success:false,
            message:"something went wrong in isAdmin",
        });
    }
}