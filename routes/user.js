const express=require("express");
const userMiddleware=require("../middleware/user");
const {User,Course}=require("../db/index");

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


router.get('/courses',async (req,res)=>{
    const response= await Course.find({});
    
    res.json({
        courses:response,
    })
});

router.post('/courses/:courseId',userMiddleware,async (req,res)=>{
     const courseId=req.params.courseId;
     const username=req.headers.username;
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
