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
    res.send(req.body);
    // twitterClient.post('statuses/update', {status: req.body.tweetContent, in_reply_to_screen_name: 'malkaclare'}, function(error, tweet, response) {
    //   if (!error) {
    //     console.log(tweet);
    //     res.send('tweet sent');
    //   } else {
    //     res.status(500).send('tweet could not be sent');
    //   }
    // });


  })

export default userRouter
