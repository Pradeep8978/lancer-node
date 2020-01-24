const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const courseSchema = new Schema({
    userId: String,
    courseName: String,
    description: String,
    metaTags: String,
    curriculum: Array,
    liveCourse: Boolean,
    liveSession: Boolean
});


// Create a model
const Course = mongoose.model('course', courseSchema);

// Export the model
module.exports = Course;