const express = require('express');
const router = require('express-promise-router')();
const Collaboration = require('../controllers/collaboration');

router.route('/compile/:language')
  .post(Collaboration.compileCode);
router.route('/update-editor/:id')
  .post(Collaboration.updateEditor);


  module.exports = router;