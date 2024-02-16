const express=require("express");
const userMiddleware=require("../middleware/user");
const {User,Course}=require("../db/index");
const jwt=require("jsonwebtoken");
const JWT_SECRET=require("../config");

const router=express.Router();



router.post('/signup',async (req,res)=>{
    
    const username=req.body.username;
    const password=req.body.password;

    await User.create({
        username:username,
        password:password
    })

    res.json({
        message:"User Created succesfully",
    })

});

router.post('/signin',async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    const user=await  User.find({
        username:username,
        password:password
    })

    if(user){
        const token=jwt.sign({
            username
        },JWT_SECRET);
    
        res.json({
            token
        })
    }
    else{
       res.json(411).json({
        message:"Incorrect email and pass"
       }) 
    }
});

router.get('/courses',async (req,res)=>{
    const response= await Course.find({});
    
    res.json({
        courses:response,
    })
});

router.post('/courses/:courseId',userMiddleware,async (req,res)=>{
     const courseId=req.params.courseId;
     const username=req.username;
     await User.updateOne({
            username:username
    },{
        "$push":{
            purchasedCourses:courseId
        }
    }); 

     res.json({
        message:"purchase complete!"
     })

});

router.get('/purchasedCourses',userMiddleware, async(req,res)=>{
   
    const username=req.headers.username;

    const user = await User.findOne({
        username:username
    })

    console.log(user.purchasedCourses);

    const courses=await Course.find({
        _id:{
            "$in":user.purchasedCourses
        }
    })
    res.json({
        courses:courses,
    })
})

module.exports=router;
