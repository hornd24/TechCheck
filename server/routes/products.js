import express from "express";
import products from "../controllers/productsController"

import aws from 'aws-sdk'

import multer from 'multer'
import multerS3 from 'multer-s3'
import s3Key from '../../awskey'
import s3Secret from '../../awssecret'
import { product } from "../../../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/prelude-ls";
const router = express.Router();
aws.config.update({
    accessKeyId:process.env.s3_key||s3Key,
    secretAccessKey: process.env.s3_secret||s3Secret
  });
const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'techcheckbucket',
      acl: 'public-read',
      key: function (req, file, cb) {
        cb(null, file.originalname); //use Date.now() for unique file keys
        //var imagePath = file.originalname
  
      }
  
  
    })
  });
// Route to get list of crypto currencies for drop down.
router.get("/", products.findAll);
router.get("/:id", products.findById);
router.post("/", products.create);
router.put("/:id", products.update);
router.delete("/:id", products.remove);
router.get('/user/products',products.userProducts)
router.post('/upload', upload.array('upl', 1), function (req, res, next) {
    res.send("Uploaded!");
  });

// Export routes for server.js to use.
export default router;
