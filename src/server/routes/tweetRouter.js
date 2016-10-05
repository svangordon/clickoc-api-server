const tweetRouter = require('express').Router();
// import User from '../model/user.model.js';
import config from '../config';
import Twitter from 'twitter';

tweetRouter.route('/tweet')
  .get((req, res) => {
    res.send('rooty tooty')
  })
  .post((req, res) => {
    let twitterClient = new Twitter({
      consumer_key: config.TWITTER_AUTH.TWITTER_KEY,
      consumer_secret: config.TWITTER_AUTH.TWITTER_SECRET,
      access_token_key: req.user.twitter.token,
      access_token_secret: req.user.twitter.tokenSecret
    });
    console.log(req.body);
    // res.send(req.body);
    let successfulTweets = 0;
    req.body.legislators.forEach(legislator => {
      twitterClient.post('statuses/update', {
        status: "@" + legislator.twitterId + " " + req.body.tweetContent,
        in_reply_to_screen_name: legislator.twitterId
      }, (error, tweet, response) => {
        if (!error) {
          console.log('set tweet to ', legislator.twitterId);
          successfulTweets++;
          if (successfulTweets === req.body.legislators.length) {
            res.send('all tweets sent');
          }
        } else {
          // res.status(500).send('tweet could not be sent');
        }
      });

    });


  })

export default tweetRouter
