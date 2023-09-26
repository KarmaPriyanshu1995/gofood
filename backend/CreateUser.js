const express =require('express')
const router =express.Router()
const User = require('./models/user.model')
const { body, validationResult } = require('express-validator')
router.post("/createuser",[body('email').isEmail(),body('name').isLength({min:5}),body('password',"Invalid password").isLength({min:5})],async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    try{
      await  User.create({
            name:req.body.name,
            password:req.body.password,
            location:req.body.location,
            email:req.body.email,

        })
        res.json({success:true})

    }catch(err){
console.log(err)
res.json({success:false})
    }
})

module.exports=router;