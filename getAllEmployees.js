const employeeModel=require("../models/employeeSch");
const taskModel=require("../models/taskSchema");

exports.getAllEmployees=async (req,res)=>{
    try{

        const allEmps=await employeeModel.find({})
                        .populate("tasks")
                        .exec();


        return res.status(200).json({
            success:true,
            allEmployees:allEmps,
            message:"all data feched"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"something went wrong while fetching all empoyees data"
        })
    }
}