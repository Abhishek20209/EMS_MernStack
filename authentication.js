const express=require("express");
const bcrypt=require("bcrypt");
const Jwt=require("jsonwebtoken");
const employeeModel=require("../models/employeeSch");
const taskModel=require("../models/taskSchema");

require("dotenv").config();

exports.signup=async (req,res)=>{

    try{

        const {email,password,name}=req.body;

        if(!email || !password || !name)
            {
                res.json({
                    success:false,
                    message:"please enter all the details"
                })
            }

        const fnd=await employeeModel.findOne({email});

        if(fnd)
        {
            return res.json({
                success:false,
                message:"user already exists",
            });
        }

        let hashedPassword;

        try{

            hashedPassword=await bcrypt.hash(password,10);

        }catch(error){
            return res.status(500).json({
                success:false,
                error:error,
            });
        }

        const newEmployee=await employeeModel.create({email,name,password:hashedPassword});
        
        // newEmployee=newEmployee.toObject();

        // newEmployee.password=undefined;


        return res.status(200).json({
            success:true,
            data:newEmployee,
            message:"employee created successfully",
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error,
            message:"error occured while signUp"
        });
    }

    
}


exports.signin=async (req,res)=>{

    try{
        
        const {email,password}=req.body;

        if(!email || !password)
            {
                res.json({
                    success:false,
                    message:"please enter all the details"
                })
            }


        let employee=await employeeModel.findOne({email})
                        .populate("tasks")
                        .exec();

        if(!employee)
        {
            return res.status(401).json({
                success:false,
                message:"user does not exits",
            })
        }

        


        if(await bcrypt.compare(password,employee.password))
        {
            let role="employee";

            if(employee.email=="admin@me.com")
            {
                role="admin";
            }

            const payload={
                email:employee.email,
                role:role,
                id:employee._id,
            }

            console.log("payload at signIn",payload);

            let token=Jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"});

            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                // sameSite: 'lax',
                secure: false, 
                sameSite: 'lax',
                // secure:"none",
                httpOnly:true
            }

            if(role==="admin")
            {
                const data=await employeeModel.find({})
                                .populate("tasks")
                                .exec();


                return res.cookie("token",token,options).json({
                    success:true,
                    data:data,
                    
                    message:"admin logged in successfully"
                });
            }
            else{

                employee=employee.toObject();
                employee.password=undefined;

                return res.cookie("token",token,options).json({
                    success:true,
                    data:employee,
                    token,
                    message:"employee logged in successflly"
                });
            }

            
         }
         else
         {
            return res.status(403).json({
                success:false,
                message:"incorrect password",
            })
         }

    }
    catch(error){

        return res.status(500).json({
            success:false,
            error:error,
            message:"error occured while signin"
        });
    }
}

