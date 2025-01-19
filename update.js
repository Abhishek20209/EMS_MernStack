const express=require("express");
const bcrypt=require("bcrypt");
const Jwt=require("jsonwebtoken");
const employeeModel=require("../models/employeeSch");
const taskModel=require("../models/taskSchema");

require("dotenv").config();

exports.update=async(req,res)=>{
    try{
        const {taskId,empId,status}=req.body;
        
        const taskData=await taskModel.findByIdAndUpdate(
            taskId,
            {status},
            { new: true, runValidators: true }
        );

        console.log("updatedTask =",taskData);


        let updatedEmployee=null;

        if(status=="active")
        {
            updatedEmployee=await employeeModel.findByIdAndUpdate(
                empId,
                {
                    $inc:{
                        activeTasks:1,
                        newTasks:-1
                    }
                },
                {new:true}
            ).populate("tasks")
            .exec();

        }
        else if(status==="completed")
        {
            updatedEmployee=await employeeModel.findByIdAndUpdate(
                empId,
                {
                    $inc:{
                        activeTasks:-1,
                        completedTasks:1
                    }
                },
                {new:true}
            ).populate("tasks")
            .exec();
        }
        else if(status=="failed")
            {
                updatedEmployee=await employeeModel.findByIdAndUpdate(
                    empId,
                    {
                        $inc:{
                            activeTasks:-1,
                            failedTasks:1
                        }
                    },
                    {new:true}
                ).populate("tasks")
                .exec();
            }


        if(updatedEmployee)
        {
            return res.status(200).json({
                success:true,
                data:updatedEmployee
            })
        }

    }
    catch(error)
    {
        return res.status(500).json({
            succss:false,
            message:"an error occured while updating"
        });
    }
}