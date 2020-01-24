const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      console.log('REQ BODY =>', req.body)
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },

  validateParams: (schema) => {
    return (req, res, next) => {
      const params = {...req.params, ...req.query}
      const result = Joi.validate(params, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }
      next();
    }
  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string(),
      role: Joi.array(),
      phoneNumber: Joi.string(),
      designation: Joi.string(),
      experienceLevel: Joi.string(),
      technicalDescription: Joi.array()
    }),
    queryUser: Joi.object().keys({
      role: Joi.string()
    }),
    createCourse: Joi.object().keys({
      userId: Joi.string().required(),
      courseName: Joi.string().required(),
      description: Joi.string().required(),
      liveCourse: Joi.boolean().required(),
      liveSession: Joi.boolean(),
      curriculum: Joi.array().required(),
      metaTags: Joi.string().required()
    }),
    couseList: Joi.object().keys({
      id: Joi.string().required()
    }),
    uploadVideo: Joi.object().keys({
      id: Joi.string().required(),
      title: Joi.string().required()
      // video: Joi.binary().required()
    }),
  }
}