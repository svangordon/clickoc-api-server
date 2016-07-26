/**
 * Created by Peter on 26/08/15.
 */

// As of 7/17/16


export default {
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'ThemostDifficultstringYou\'ve ever heard',
  MONGO_DB: {
    MONGO_URI:  'mongodb://127.0.0.1:27017/clickoc',
  },

  TWITTER_AUTH: {
    TWITTER_KEY: "94N4AoXGxpLNW7NS1hZPEYoxs",
    TWITTER_SECRET: "G7uDyGXFgSUaom9STjLsBdabALOurA7EHTTS2QELGA881ysJAW",
    ACCESS_TOKEN: "707275933590228993-KYLMgDWzDpdfGAvywhAMFgiwYsCmTyh",
    ACCESS_SECRET: "IZ7pVdNTauNshXloKFQtmQ6aL9LZVBf0fgnKOwdvs5i2s",
    TWITTER_CALLBACK: "http://localhost:5000/auth/twitter/callback"
  },

  SERVER: {
    PORT: 5000
  },
  SUNLIGHT: {
    KEY: '6761a488051649f7ae2f14d268655326'
  }

};
