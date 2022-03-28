  const Product = require("../../../models/product");
const fs = require('fs');
const path = require("path");

module.exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
        .populate("category", " _id name ")
        .exec((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Product not found"
                });
            }
            req.product = product;
            next();
        });
};



module.exports.createProduct = (req, res) => {

    let product = new Product();

    Product.uploadProductIMG(req, res, (err) => {
        if (err) {
            console.log("*****MULTER-ERROR*******", err)
            return;
        }

        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.category = req.body.category;
        product.stock = req.body.stock,
            product.photo = Product.productIMGPath + '/' + req.file.filename;

        product.save();
        return res.status(200).json({
            message: `${product.name} created successfully`
        });

    })
}



module.exports.getProduct = (req, res) => {
    return res.json(req.product);
};




module.exports.updateProduct = (req, res) => {
    let product = req.product;

    Product.uploadProductIMG(req, res, (err) => {
        if (err) {
            console.log("*****MULTER-ERROR*******", err)
            return;
        }

        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.category = req.body.category;
        product.stock = req.body.stock;


        if (req.file) {
            fs.unlinkSync(path.join(__dirname, '../../../', product.photo));
            product.photo = Product.productIMGPath + '/' + req.file.filename;
        }

        product.save();
        return res.status(200).json({
            message: `${product.name} updated successfully`
        });

    })

}



module.exports.deleteProduct = (req, res) => {
    let product = req.product;
    fs.unlinkSync(path.join(__dirname, '../../../', product.photo));
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete the product"
            });
        }
        res.json({
            message: `${deletedProduct.name} deleted successfully`,
        });
    });
};


module.exports.getAllProducts = (req, res) => {
    Product.find()
        .populate("category")
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "NO product FOUND"
                });
            }
            res.json(products);
        });
};



exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: { _id: prod._id },
                update: { $inc: { stock: -prod.count, sold: +prod.count } }
            }
        };
    });

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if (err) {
            return res.status(400).json({
                error: "Bulk operation failed"
            });
        }
        next();
    });
};
