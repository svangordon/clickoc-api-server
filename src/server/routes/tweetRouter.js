const userRouter = require('express').Router();
import User from '../model/user.model.js';
import config from '../config';
import Twitter from 'twitter';

userRouter.route('/tweet')
  .post((req, res) => {
    let twitterClient = new Twitter({
      consumer_key: config.TWITTER_AUTH.TWITTER_KEY,
      consumer_secret: config.TWITTER_AUTH.TWITTER_SECRET,
      access_token_key: req.user.twitter.token,
      access_token_secret: req.user.twitter.tokenSecret
    });
    console.log(req.body);
  })

export default userRouter
