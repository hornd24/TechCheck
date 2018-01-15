import express from "express";
import users from "../controllers/usersController"
import s3Key from '../../awskey'
import s3Secret from '../../awssecret'
import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
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
  router.post('/upload', upload.array('upl', 1), function (req, res, next) {
    res.send("Uploaded!");
  });
router.get("/", users.findAll);
router.get("/profile/:id", users.findById);
router.post("/recover", users.forgot);
router.put("/change",users.recovery)
router.post("/", users.create);
router.post("/signIn", users.signIn);
router.put("/:email", users.update);
router.put("/verification/:id?",users.verification)
router.delete("/:id", users.remove);
router.post("/signOut",users.signOut);

// Export routes for server.js to use.
export default router;
