// Controllers for legislator routes

import getLegFromSunlight from '../helpers/getLegFromSunlight';
import Legislator from '../model/legislator.model.js';
import sunlightCongressApi from 'sunlight-congress-api';
sunlightCongressApi.init(require('../config').SUNLIGHT.KEY);
import userMethods from '../helpers/userMethods';
import moment from 'moment';
import User from '../model/user.model';
import Twitter from 'twitter';
import config from '../config';

const twitterClient = new Twitter({
  consumer_key: config.TWITTER_AUTH.TWITTER_KEY,
  consumer_secret: config.TWITTER_AUTH.TWITTER_SECRET,
  access_token_key: config.TWITTER_AUTH.ACCESS_TOKEN,
  access_token_secret: config.TWITTER_AUTH.ACCESS_SECRET
});



// Handles adding a legislator to the DB when given an object from sunlight
const addLegCallback = (legislatorObj) => {
  const query = {
    bioguideId: legislatorObj.bioguide_id
  };
  const options = {
    upsert: true,
    setDefaultsOnInsert: true,
    runValidators: true,
    new: true
  };
  const doc = {
    _id: legislatorObj.bioguide_id,
    updateDate: Date.now(),
    twitterId: legislatorObj.twitter_id,
    votesmartId: legislatorObj.votesmart_id,
    bioInfo: {
      birthday: legislatorObj.birthday,
      firstName: legislatorObj.first_name,
      nickName: legislatorObj.nickname, // if present, probably the name they go by
      lastName: legislatorObj.last_name,
      middleName: legislatorObj.middle_name,
      nameSuffix: legislatorObj.name_suffix,
      title: legislatorObj.title,
      gender: legislatorObj.gender
    },
    poliInfo: {
      state: legislatorObj.state,
      stateName: legislatorObj.state_name,
      district: legislatorObj.district || -1,
      stateRank: legislatorObj.state_rank || "",
      chamber: legislatorObj.chamber
    }
  }
  const callback = (err, doc) => {
    // res.send(doc);
  }

  Legislator.findOneAndUpdate(query, {$set: doc}, options, callback);
}
// end legCallback

// handles getting a user from twitter, updating them

let controllerMethods = {
  /*
    The final piece of the MW -- everything has been checked and updated, so let's
    just get the user out of the DB, populate the legislators and send it back.
    There's almost certainly a better way to do this, where we're using the data
    that we got out before, but this is easiest and it's not like it needs to scale
  */
  final: function (req, res) {
    User.findOne({twitterId: req.user.twitterId})
      .populate('legs.legislators')
      .exec((err, document) => {
        if (err) console.error(err);
        res.send(document.legs.legislators);
      })
  },
  validateLegs: (req, res, next) => { // This almost certainly needs to end up somewhere else
    // NB: Pass info b/w MW by modifying req object
    if (req.user.legs.legislators.length === 0 || moment().isBefore( moment(req.user.legs.lastUpdated).add(24, 'hours') ) ) {

      const coord = {
        latitude: req.user.location.lat,
        longitude: req.user.location.lng
      };

      const sunlightCallback = response => {
        const legsIds = response.results.map(cur => cur.bioguide_id);

        // so long as we have all of the legislators available, let's update them.
        // Why the fuck not?
        response.results.forEach(addLegCallback);

        console.log('legsIds ==', legsIds);
        const options = {
          new: true
        }
        User.findOneAndUpdate({twitterId: req.user.twitterId},{
          $set: {
            legs: {
              lastUpdated: Date.now(),
              legislators: legsIds
            }
          }
        }, options, (error, updatedUser) => {
          if (error) {
            console.error(error);
            res.status(500).send('unable to set legislators')
          }
          // Now let's try to populate the legislators
          User.findOne({twitterId: updatedUser.twitterId}).populate('legs.legislators')
            .exec((err, userWithLegislators) => {
              if (err)
                console.error(err);
              req.user = userWithLegislators;
              // console.log('req.user ==', req.user, req.user.legs.legislators[0].twitterData);
              next();
            })
        });
      }

      sunlightCongressApi.legislatorsLocate().addCoordinates(coord).call(sunlightCallback);
    } else {
      next();
    }

    // next()
  },
  // checks if we need to update twitter info
  // NB: Change the way that this is done. Instead of having a user command possibly
  // trigger an update of legislators record, there should be a service constantly running
  // that oh, idk, once a day makes a call for sunlight to barf up up all of the pols in congress
  // (i mean, that'd be easy -- just one api call, etc)
  checkTwitter: (req, res, next) => {
    // console.log('initial legs ===', req.user.legs);
    // let legislatorsToUpdate = req.user.legs.legislators.filter(leg =>
    //   moment().isBefore( moment(leg.twitterData.lastUpdated).add(24, 'hours') ) || leg.twitterData.account === undefined
    // ).map(leg => leg.twitterId);
    const legTotal = req.user.legs.legislators.length;
    let updateCount = 0;
    const legislatorsToUpdate = req.user.legs.legislators.join(',');

    console.log( 'legislatorsToUpdate',legislatorsToUpdate);
    if (updateCount === 0) {
      next();
    } else {
      let twitterClient = new Twitter({
        consumer_key: config.TWITTER_AUTH.TWITTER_KEY,
        consumer_secret: config.TWITTER_AUTH.TWITTER_SECRET,
        access_token_key: req.user.twitter.token,
        access_token_secret: req.user.twitter.tokenSecret
      });
      twitterClient.get('users/lookup', {screen_name: legislatorsToUpdate}, (error, accounts, response) => {
        if (error) {
          res.status(500).send('couldn\'t lookup');
        } else {
          accounts.forEach((account) => {
            Legislator.findOneAndUpdate({twitterId: account.screen_name}, {
              $set: {
                twitterData: {
                  updateDate: Date.now(),
                  accout: account
                }
              }
            }, (error, doc) => {
              updateCount++;
              if (updateCount >= legTotal) {
                next();
              }
            });
          })
        }
      });
    }
  }
}

export default controllerMethods
