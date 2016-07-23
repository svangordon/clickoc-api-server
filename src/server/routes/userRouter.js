const userRouter = require('express').Router();
import User from '../model/user.model.js';

userRouter.route('/user')
  .get((req, res) => {
    res.send(req.user);
  })
  .post((req, res) => {
    console.log('req.data ==', req.user.id);
    User.update({'twitter.id': req.user.id}, {
      $set: {
        location: req.body
      }
    });
    // not sure if there's a way to avoid making this second db call (bc it's a little silly)
    // but hey, whatevs. We've updated the record, so send them the new one from the db
    User.findOne({'twitter.id': req.user.id}, (err, user) => {
      console.log('sending user', user)
      res.send(user)
    })

  })

export default userRouter
