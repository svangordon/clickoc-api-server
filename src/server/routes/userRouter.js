const userRouter = require('express').Router();
import User from '../model/user.model.js';

userRouter.route('/user')
  .get((req, res) => {
    res.send(req.user);
  })
  .post((req, res) => {
    console.log('req.body ==', req.body);
    User.findOne({'twitter.id': req.user.twitter.id}, (err, user) => {
      console.log('user.loc ==', user.location, ...req.body);
      user.location = req.body;
      console.log('user.loc ==', user.location);
      user.save((err, updatedUser) => {
        if (err) {
          res.status(500).send('server error: unable to set location');
        }
        res.send(updatedUser);
      });
    });

  })

export default userRouter
