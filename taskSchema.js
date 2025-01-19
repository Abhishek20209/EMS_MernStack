const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema({

    email:{
        type:String,
        required:true,
    },

    assignedToId:{
        type:mongoose.Schema.ObjectId,
        ref:'employeeModel',
        requried:true
    },

    status: {
        type: String,
        enum: ['new', 'active', 'completed', 'failed'],
        required: true,
        default: 'new'
    },

    deadline:{
        type:Date,
        required:true,
    },

    title:{
        type:String,
        maxlength:20,
        required:true
    },

    description:{
        type:String,
        maxlength:100,
        required:true
    },
    
});

module.exports=mongoose.model("taskModel",taskSchema);