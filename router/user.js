const User = require('./../models/user');
const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router();


// Route to create a user
router.post('/createUser', async (req,res) => {
    let user = new User({
        first_name : req.body.first_name,
        last_name: req.body.last_name,
        email : req.body.email,
        password_hash : await bcrypt.hash(req.body.password, 12),
        password : req.body.password,
        isAdmin : req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country

    })

    user.save()
        .then( data => {
            res.status(200).json({status:true, message: "User created!!"})
        })
        .catch( err => {
            console.log(`Error while creating user ${err}`)
            res.status(500).json({status: false, message: "Error while creating user"})
        })
})


// Route to get users
router.get('/users', (req,res) => {
    User.find().select('-password_hash').then( users => {
        if(!users.length){
            res.status(200).json({status: false , data: "No Users to retrieve"})
        }
        else{
            res.status(200).json({status: true, data: users})
        }
    }).catch( err => {
        console.log(`Error while retrieving users ${err}`)
        res.status(500).json({status: false, data: "Error!! Can't retrieve"})
    })
})

// Route to get a single user

router.get('/user/:id', (req,res) => {
    User.findById(req.params.id).then( user => {
        if(!user){
            res.status(200).json({status: false , data: "No User to retrieve with that id"})
        }
        else{
            res.status(200).json({status: true , data: user})
        }
    }).catch( err => {
        console.log(`Error while retrieving single user by id ${err}`)
        res.status(500).json({status: false, data: "Error!! Can't retrieve"})
    })
})

// Route to update users info
router.put('/updateUser/:id', async (req,res) => {
    let newPassword;
    
    const user = await User.findById(req.params.id)
        .catch( err => res.status(500).json({status: false, message: "Can't find user with that id"}))
    
    if(req.body.password){
        //Update Password
        newPassword = await bcrypt.hash(req.body.password, 12);
    }else{
        //Keep the old password
        newPassword = user.password_hash;
    }

    User.findByIdAndUpdate(req.params.id, {
        first_name : req.body.first_name,
        last_name: req.body.last_name,
        email : req.body.email,
        password_hash : newPassword,
        password : req.body.password,
        isAdmin : req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country
    },
    { 
        new: true,
        useFindAndModify: false
    }).select('-password_hash')
    .then( user  => {
        res.status(200).json({status: true, data: user})
    })
    .catch( err => {
        console.log(`Error while updating users info`)
        res.status(500).json({status: false, message: "Error while updating"})
    })

    
})

module.exports = router;