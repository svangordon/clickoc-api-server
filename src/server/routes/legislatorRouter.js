let legislatorRouter = require('express').Router();
import legislatorControllers from '../controllers/legislatorControllers.js';

legislatorRouter.route('/legislator')
  .get(legislatorControllers.validateLegs, legislatorControllers.checkTwitter, legislatorControllers.final)

export default legislatorRouter
