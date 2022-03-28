const mongoose = require("mongoose");

const multer = require("multer");
const path = require("path");

const IMG_PATH = path.join("/uploads/products")

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        description: {
            type: String,
            trim: true,
            required: true,
            maxlength: 2000
        },
        price: {
            type: Number,
            required: true,
            maxlength: 32,
            trim: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        stock: {
            type: Number
        },
        sold: {
            type: Number,
            default: 0
        },
        photo: {
            type: String,
        }
    },
    { timestamps: true }
);



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', IMG_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});




//static methods 
productSchema.statics.uploadProductIMG = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'));
        }
        cb(null, true);
    }
}).single('photo');


productSchema.statics.productIMGPath = IMG_PATH;



module.exports = mongoose.model("Product", productSchema);
