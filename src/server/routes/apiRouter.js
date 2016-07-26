let apiRouter = require('express').Router();
import userRouter from './userRouter';
import legislatorRouter from './legislatorRouter';

apiRouter.use(
  userRouter,
  legislatorRouter
);

export default apiRouter
