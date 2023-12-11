const express = require("express");
const router = express.Router()
const User = require('../models/userModel');

router.get('/all', async(req, res) => {
    try{
         const users = await User.find();
         if(users){
            res.json({
                users,
                statusCode : 200,
                msg : "Fetched Succesfully",
                count : users.length || 0
            })
         }
    }catch(e){
        res.status(500).json({
            users : [],
            statusCode : 500,
            msg : "Problem occured while fetching users"
        })
        console.log("Error while Fetching All Users --> ",e)
    }
})

module.exports = router