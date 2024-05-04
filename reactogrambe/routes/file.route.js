const  express =require('express');
const router=express.Router();
const multer=require('multer');

const storage=multer.diskStorage({
      destination:(req,file,cb)=>{
        cb(null,'uploads/')
      },
      filename:(req,file,cb)=>{
        cb(null,file.originalname)
      }
})

const upload=multer({
   storage:storage,
   limits:{
    fileSize:1024*1024*5
   },
   fileFilter:(req,file,cb)=>{
     if(file.mimetype==='image/png' || file.mimetype==='image/jpg' ||file.mimetype==='image/jpeg'){
        cb(null,true);
     }
     else{
        cb(null,false);
        return res.status(400).json({error:"file types allowed are .jpeg .png .jpg"});
     }
   }
});

router.post("/uploadfile",upload.single('file'),function(req,res){
   res.json({"filename":req.file.filename});
});

const downloadFile=(req,res)=>{
     const filename=req.params.filename;
     const path=__basedir+"/uploads/";

     res.download(path+filename,(error)=>{
           if(error){
            res.status(500).send({message:"file cannot be downloaded"+error});
           }
     })
}

router.get("/files/:filename",downloadFile);


module.exports=router;