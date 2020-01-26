const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
// const axios = require('axios')
const { validateBody, schemas, validateParams } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const multer = require('multer');
const CircularJSON = require('circular-json');
var os = require("os");
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

router.route('/auth')
  .post(validateBody(schemas.authSchema), UsersController.auth);

router.route('/status')
  .get(passportJWT, UsersController.checkAuth);

router.route('/list')
  .get(passportJWT, validateParams(schemas.queryUser), UsersController.getUsers);

router.route('/profile/update')
  .put(passportJWT, UsersController.updateProfile)

router.route('/profile')
  .get(passportJWT, UsersController.getProfile)

router.route('/image/upload')
  .post(upload.single('resume'), (req, res, next) => {
    const file = req.file;
    console.log('REEQ BODY =>', req.body.origin)
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    const file_location = `${req.body.origin}/${file.destination}/${file.filename}`
      res.send(file_location);
  });

module.exports = router;