const {getsignup,getlogin} =require('../controllers/usercontroller');
const express =require('express');
const router=express.Router();


router.post("/signup",getsignup)
router.post("/login",getlogin)


module.exports=router;