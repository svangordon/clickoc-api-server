let testRouter = require('express').Router();
import testControllers from '../controllers/testcontrollers.js';

testRouter.route('/')
  .get(testControllers.test)

export default testRouter
