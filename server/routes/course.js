const router = require('express-promise-router')();
const Course = require('../controllers/course');
const { validateBody, schemas, validateParams } = require('../helpers/routeHelpers');
const multer = require('multer'); 
var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, 'uploads/videos')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'-'+ file.originalname)
  }
})
 
const upload = multer({ storage: storage })

router.route('/create')
  .post(validateBody(schemas.createCourse), Course.createCourse);
  router.route('/edit/:courseId')
  .post(Course.editCourse);  
router.route('/list/:id')
  .get(validateParams(schemas.couseList), Course.courseList);  
// router.route('/add/topic')
//   .post()  
router.route('/upload/video')
   .post(upload.single('video'), validateBody(schemas.uploadVideo), Course.updateCourseContent);
// router.route('/list/:id')
//    .get(validateParams(schemas.couseList), Course.courseList);     


  module.exports = router;