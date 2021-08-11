const express = require('express')
const Category = require('./../models/category')
const router = express.Router()

//Get all the categories
router.get('/categories', (req, res) => {
    Category.find()
        .then( data => res.status(200).json(data))
        .catch( err => {
            console.log(err);
            res.status(500).json({status:"failed", message: err})
        })
})

// Get a particular category
router.get('/category/:id', (req,res) => {
    Category.findById(req.params.id)
        .then( data => res.status(200).json(data))
        .catch( err => {
            console.log(err);
            res.status(500).json({status:"failed", message: err})
        })
})

// Add a category
router.post('/category',async (req,res) => {
    const category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    
    category.save()
        .then( (newCategory) => res.status(200).json({success : true, category: newCategory }))
        .catch( (err) => console.log(err))    
})

// Delete a category
router.delete('/category/:id', (req,res) => {
    Category.findByIdAndDelete(req.params.id)
        .then( (category) =>  res.status(200).json({success : true, category: category }))
        .catch( (err) => res.status(500).json({success: false, message: 'Cant delete category ' + err}))
})

// Update a category
router.put('/category/:id', (req,res) => {
    Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    },{
        new : true,
        useFindAndModify: false
    })
    .then( (category) =>  res.status(200).json({success : true, category: category }))
    .catch( (err) => res.status(500).json({success: false, message: 'Cant delete category ' + err}))
})

module.exports = router;