let apiRouter = require('express').Router();
import userRouter from './userRouter';

apiRouter.use(
  userRouter
);

export default apiRouter
