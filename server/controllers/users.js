const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');

const signToken = user => {
  return JWT.sign({
    iss: 'lancer',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {
  auth: async (req, res, next) => {
    const { phone } = req.value.body;

    // Check if there is a user with the same email
    let foundUser = await User.findOne({ phone });

    if (foundUser) {
      // Generate the token
      const token = signToken(foundUser);
      // Respond with token
      // res.cookie('access_token', token, {
      //   httpOnly: true
      // });
      res.status(200).json({ token });
    }

    // Create a new user
    const newUser = new User({ 
        phone: phone
    });

    const userObj = await newUser.save();

    // Generate the token
    const token = signToken(newUser);
    // Send a cookie containing JWT
    // res.cookie('access_token', token, {
    //   httpOnly: true
    // });
    // res.setHeader('Authorization', token);
    console.log("USER OBJECT=>", userObj)
    res.status(200).json({token});
  },


  dashboard: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({ 
      secret: "resource",
      methods: req.user.methods
    });
  },

  checkAuth: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({ success: true });
  },

  getUsers: async (req, res, next) => {
    const findSchema = req.query.role ? {
      'profile.role': {"$in" : req.query.role}
    } : {};
    const users = await User.find(findSchema)
    res.json(users);
  },

  updateProfile: async(req, res) => {
    console.log('UPDATE PROFILE BODY', req.body);
    console.log('USER INFO =>', req.user);
    const newProfile = {...req.user.profile, ...req.body}
    await User.update({ _id: req.user._id}, {profile: newProfile});
    res.send({message: 'success'});
  },

  getProfile: async(req, res) => {
    res.send(req.user.profile);
  }
}