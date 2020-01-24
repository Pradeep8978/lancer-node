const Pusher = require('pusher');
var Courses = require('./../models/course');

module.exports = {
    createCourse: (req, res, next) => {
        var course = new Courses(req.body);
        course.save(function (err, courseDetails) {
            if (err) {
                req.send(err);
            }
            else {
                res.send({success: true});
            }
        });
    },

    courseList: (req, res, next) => {
        const {id} = req.params;
        Courses.find({userId: id}).exec(function (err, list) {
            if (err) {
                req.send(err)
            }
            else {
                // if (!list) res.status(404).send({message:'NO_RECORDS'});
                res.send(list);
            }
        });
    },

    updateCourseContent: async(req, res, next) => {
        const file = req.file;
        const {id, title} = req.body;
        console.log('REQ BODY =>', req.body)
        if (!file) {
          const error = new Error('Please upload a file')
          error.httpStatusCode = 400
          return next(error)
        }
        // console.log('FILEE DETAILS =>', file)
        const courseDetails = await Courses.findOne({_id: id});
        courseDetails.curriculum.push({title, path: file.path});
        console.log('COURSE DETAILS =>', courseDetails)
        Courses.updateOne({_id: id}, {curriculum: courseDetails.curriculum}, function (err, details) {
            if (err) {
                res.send(err)
            }
            else {
                // if (!details) res.status(404).send(NO_RECORDS);
                res.send({ message: 'updated Successfully' });
            }
        });
        //   res.send(file)
    },

    editCourse: (req, res, next) => {
        Courses.updateOne({_id: req.params.courseId}, req.body, (err, course) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send({ message: 'updated Successfully' });
            }
        })
    }


}