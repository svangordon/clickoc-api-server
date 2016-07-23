const userRouter = require('express').Router();
import User from '../model/user.model.js';

userRouter.route('/user')
  .get((req, res) => {
    res.send(req.user);
  })
  .post((req, res) => {
    console.log('req.data ==', req);
    User.update({'twitter.id': req.user.id}, {
      $set: {
        location: req.data.location
      }
    });
    // Now that we've updated the user, have them send a get request to This
    // route so that we're sending them back a fresh updated user object
    res.redirect('');
  })

export default userRouter
