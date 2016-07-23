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
          console.log('could not update record', err);
        }
        res.send(updatedUser);
      });
    });


    // updatedRecord.location = req.body;
    // console.log(updatedRecord)
    // updatedRecord.save();
    // res.send(updatedRecord);
    // User.update({'twitter.id': req.user.twitter.id}, {
    //   $set: {
    //     location: req.body
    //   }
    // }, () => {});
    // not sure if there's a way to avoid making this second db call (bc it's a little silly)
    // but hey, whatevs. We've updated the record, so send them the new one from the db
    // User.findOne({'twitter.id': req.user.twitter.id})

  })

export default userRouter
