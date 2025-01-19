const express = require("express");
const router = express.Router();


const {signin,signup}=require("../controller/authentication");
const {createTask}=require("../controller/createTask");
const {auth,isAdmin}=require("../middleware/auth");
const {getAllEmployees}=require("../controller/getAllEmployees");
const {update}=require("../controller/update");

// auth,isAdmin,

router.post("/signup",signup);

router.post("/signin",signin);

router.post("/createTask",createTask);

router.get("/getAllEmployees",getAllEmployees);

router.post("/update",update);


module.exports=router;
