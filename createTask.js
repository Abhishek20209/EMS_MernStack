const express=require("express");
const employeeModel=require("../models/employeeSch");
const taskModel=require("../models/taskSchema");


exports.createTask=async(req,res)=>{
    try{

        console.log("inside create task");

        const {email,description,deadline,title}=req.body;

        console.log(email,description,deadline);

        const token=req.cookies.token;

        console.log(token)

        if(!email || !description || !deadline|| !title||email==="admin@me.com")
        {
            return res.statua(401).json({
                success:false,
                message:"please fill all the data correctly and retry"
            });
        }

        const employee=await employeeModel.findOne({email});

        if(!employee)
        {
            return res.status(401).json({
                success:false,
                message:"Employee does not exists"
            });
        }

        const id=employee._id;

        console.log("emp id whome task is assigned =",id);
        
        const cnt_task=employee.newTasks;

        const parsedDeadline = new Date(deadline);
        console.log("Parsed deadline:", parsedDeadline);

        console.log("id=",id);

        if (isNaN(parsedDeadline)) {
            return res.status(400).json({
                success: false,
                message: "Invalid deadline format. Please use YYYY-MM-DD or a valid date string.",
            });
        }

        const newTask=await taskModel.create({email:email,assignedToId:id,deadline:parsedDeadline,title:title,description:description});

        await employeeModel.findByIdAndUpdate(id,{newTasks:cnt_task+1});

        const updatedEmployee=await employeeModel.findByIdAndUpdate(id, {$push :{tasks:newTask._id}},{new:true})
                                .populate("tasks")
                                .exec();

        const retData=await employeeModel.find({})
                            .populate("tasks")
                            .exec();


            

        return res.status(200).json({
            success:true,
            data:retData,
            updatedEmployee:updatedEmployee,
            message:"new Task created Successfully"
        })

    }
    catch(error){
        return res.status(401).json({
            success:false,
            error:error,
            message:"Error while creating a new task"
        });
    }
}