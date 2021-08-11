const express = require('express')
const Product = require('./../models/product')
const Category = require('./../models/category')
const router = express.Router();

// Get all products, and by category
router.get('/products', (req,res) => {
    let filter = {}

    if(req.query.categories){
        filter = { category: req.query.categories.split(',')}
    }
    console.log(filter)
    Product.find(filter).select('name image').populate('category')
        .then( (data) => {
            res.status(200).json({status : true, data : data})
        })
        .catch( (err) => {
            console.log(`Error while getting products ${err}`)
            res.status(500).json({status : false, message : "Can't get the Products"});
        })
})

// Get a single product
router.get('/product/:id', (req,res) => {
    Product.findById(req.params.id)
        .then( data => res.status(200).json({status : true, data : data}))
        .catch( err =>  res.status(500).json({status : false, message : "Can't get the Product"}))
})


// Create a product
router.post('/product',(req,res) => {

    const category = req.body.category;

    const category_detials = Category.findById(category)
    .then((data) => {

            const product = new Product({
                name : req.body.name,
                description : req.body.description,
                richDescription : req.body.richDescription,
                image : req.body.image,
                images : req.body.images,
                brand : req.body.brand,
                price : req.body.price,
                category : req.body.category,
                countInStock : req.body.countInStock,
                rating : req.body.rating,
                isFeatured : req.body.isFeatured
            })
        
            product.save().then( (data) => {
                res.status(200).json({ status : true, message : "Product Created"})
            }).catch( (err) => {
                console.log(`Product Creation Error : ${err}`)
                res.status(500).json({status : false, message : "Can't Create the Product"});
            })
        }
    )
    .catch ( err =>  res.status(500).json({status: false, message: "Category Not Found"}))
})


// Update a product
router.put('/product/:id', (req,res) => {
    Product.findByIdAndUpdate( req.params.id, {
        name : req.body.name,
        description : req.body.description,
        richDescription : req.body.richDescription,
        image : req.body.image,
        images : req.body.images,
        brand : req.body.brand,
        price : req.body.price,
        category : req.body.category,
        countInStock : req.body.countInStock,
        rating : req.body.rating,
        isFeatured : req.body.isFeatured
    }, {
        new: true,
        useFindAndModify: false
    })
    .then( (data) => res.status(200).json({ status : true, message : "Product Created" , data: data}))
    .catch( (err) => {
        console.log(`Error while updating product ${err}`)
        res.status(500).send({status : false, message:'Error while updating the data'})
    })
})

// Delete a product
router.delete('/product/:id', (req,res) => {
    Product.findByIdAndDelete(req.params.id)
        .then( (data) => res.status(200).json({status: true, message: "Product Deleted"}))
        .catch( (err) => {
            console.log(`Error while deleting a product ${err}`)
            res.status(500).json({status: false, message: "Error while deleting product"})
        })
}) 


// Get products count
router.get('/products/count', (req,res) => {
    Product.countDocuments()
        .then( (count) => res.status(200).json({status: true, count:count}))
        .catch(err => {
            console.log(`Error while getting products count ${err}`)
            res.status(500).json({status: false, message: "Error while getting products count"})
        })
})

// Get featured products
router.get('/products/featured/:count', (req,res) => {
    const count = req.params.count ? req.params.count : 2;

    Product.find( {
        isFeatured : true
    }).limit(+count)
    .then( data => res.status(200).json({status: true, data: data}))
    .catch( err => {
        console.log(`Error while getting featured products ${err}`)
        res.status(500).json({status: false, message: "Error while getting featured products"})
    })
})



module.exports = router;