const express=require("express");
const userMiddleware=require("../middleware/user");

const router=express.Router();



router.post('/signup',(req,res)=>{

});


router.post('/courses',userMiddleware,(req,res)=>{

});

router.get('/courses',userMiddleware,(req,res)=>{

});

module.exports=router;
