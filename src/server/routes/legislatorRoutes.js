let legislatorRouter = require('express').Router();
import legislatorControllers from '../controllers/legislatorControllers.js';

legislatorRouter.route('/')
  .get(legislatorControllers.test)

export default legislatorRouter
