const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const methooverride = require("method-override");
const Todo = require("../model/todo");


function wrapAsync(fn){
    return function(req,res,next){
        fn(req,res,next)
        .catch((err)=>{
            next(err)
        });
    }
};


router.get("/",wrapAsync(async (req,res)=>{
    let data = await Todo.find({});
    console.log(data);
    res.status(200).json(data);
}));

router.post("/new",wrapAsync(async(req,res)=>{
    let data = await req.body;
    
    if(!data || !data.title){
        return res.status(400).json({mssg:"data not found"})
    }
    let ans = await new Todo(data);
    await ans.save();
    console.log(ans);
    res.status(201).json(ans);
})); 

router.put("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({mssg:"page not found"});
  }
    let data =await req.body;
    let ans = await Todo.findByIdAndUpdate(id,data,{new:true});
    res.status(202).json(ans);
}))
router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id}  = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({mssg:"page not found"});
  }
    await Todo.findByIdAndDelete(id)
    res.status(203).json({mssg:"Delete request to api/todo"});
}))

module.exports =  router;