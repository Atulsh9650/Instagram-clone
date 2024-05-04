const postModel = require('../models/post.model');
const express =require('express');
const router=express.Router();
const protectedroute=require('../middleware/protectedResource');

//all users posts
router.get("/allposts",(req,res)=>{
    postModel.find()
    .populate("author","_id fullname profileImg")
    .populate("comments.commentBy","_id fullname")
    .then((dbPosts)=>{
        res.status(200).json({posts:dbPosts})
    })
    .catch((error)=>{
        console.log(error);
    })
});

//all  posts only from login users
router.get("/myallposts",protectedroute,(req,res)=>{
    postModel.find({author:req.user._id})
    .populate("author","_id fullname profileImg")
    .then((dbPosts)=>{
        res.status(200).json({posts:dbPosts})
    })
    .catch((error)=>{
        console.log(error);
    })
});


router.delete("/deletepost/:postId", protectedroute, async (req, res) => {
    try {
        const postFound = await postModel.findOne({ _id: req.params.postId }).populate("author", "_id");
        
        if (!postFound) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Check if post author is the same as the logged-in user
        if (postFound.author._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        // If authorized, delete the post
        await postModel.deleteOne({ _id: req.params.postId });
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});




router.post("/createpost",protectedroute,async(req,res)=>{
    const {description,location,image}=req.body;
    if(!description || !location || !image){
        return res.status(400).json({error:"All fiels are mandatory"});
    }
    req.user.password=undefined;
    const postobj=new postModel({description:description,location:location,image:image,author:req.user});
    const resp = await postobj.save();
    return res.status(201).json({ message: "post is created", resp })
}
    );

 router.put("/like", protectedroute, async (req, res) => {
        try {
            const result = await postModel.findByIdAndUpdate(
                req.body.postId,
                { $push: { likes: req.user._id } },
                { new: true }
            ).populate("author", "_id fullname").exec();
    
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
    
    router.put("/unlike", protectedroute, async (req, res) => {
        try {
            const result = await postModel.findByIdAndUpdate(
                req.body.postId,
                { $pull: { likes: req.user._id } },
                { new: true }
            ).populate("author", "_id fullname").exec();
    
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
    
    router.put("/comment", protectedroute, async (req, res) => {
        try {
            const comment={commentText:req.body.commentText,commentBy:req.user._id}
            const result = await postModel.findByIdAndUpdate(
                req.body.postId,
                { $push: { comments: comment } },
                { new: true }
            ).populate("comments.commentBy", "_id fullname") //comment owner
            .populate("author", "_id fullname") //post owner
            .exec();
    
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
   

module.exports=router;