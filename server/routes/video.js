const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Video } = require("../models/Video");
const { auth } = require("../middleware/auth");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");

//Storage Multer config
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

const upload = multer({ storage:storage }).single("file")

//=================================
//             Video
//=================================

router.post('/uploadfiles',(req, res) => {
    upload(req,res,err => {
        if(err){
            return res.json({ success:false,err })
        }else{
            return res.json({ success:true, url:res.req.file.path, fileName:res.req.file.fielname })
        }
    })
    //비디오를 서버에 저장
})

router.post("/thumbnail", (req, res) => {
    let thumbsFilePath = "";
    let fileDuration = "";
  
     // 비디오 전체 정보 추출
    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
      console.dir(metadata);
      console.log(metadata.format.duration);
  
      fileDuration = metadata.format.duration;
    });
  
    //썸네일 생성, 비디오 길이 추출
    ffmpeg(req.body.url)
      .on("filenames", function (filenames) {
        console.log("Will generate " + filenames.join(", "));
        filePath = "uploads/thumbnails/" + filenames[0];
      })
      .on("end", function () {
        console.log("Screenshots taken");
        return res.json({
          success: true,
          url: filePath,
          fileDuration: fileDuration,
        });
      })
      .on("error", function (err) {
        console.error(err);
        return res.json({ success: false, err });
      })
      .screenshots({
        // Will take screens at 20%, 40%, 60% and 80% of the video
        count: 1,
        folder: "uploads/thumbnails",
        size: "320x200",
        // %b input basename ( filename w/o extension )
        filename: "thumbnail-%b.png",
      });
});

router.post('/uploadVideo',(req, res) => {
  //비디오 정보를 저장한다. 
  const video = new Video(req.body)
  video.save((err,doc)=>{
    if(err) return res.json({success: false, err})
    res.status(200).json({success: true})
  })
})

router.get("/getVideos", (req, res) => {

    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })

});


router.post("/getVideo", (req, res) => {

    Video.findOne({ "_id" : req.body.videoId })
    .populate('writer')
    .exec((err, video) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, video })
    })
});



module.exports = router;
