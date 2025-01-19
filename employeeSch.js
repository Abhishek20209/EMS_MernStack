const mongoose=require("mongoose");

const employeeSchema=new mongoose.Schema({ 

    email:{
        type:"string",
        required:true
    },

    name:{
        type:"string",
        required:true,
    },

    password:{
        type:"string",
        required:true,
    },

    tasks:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"taskModel"
        }
    ],
    
    activeTasks: {
        type: Number,
        default: 0
    },

    newTasks: {
        type: Number,
        default: 0
    },

    completedTasks: {
        type: Number,
        default: 0
    },

    failedTasks: {
        type: Number,
        default: 0
    }
});

module.exports=mongoose.model("employeeModel",employeeSchema);