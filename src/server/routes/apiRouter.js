let apiRouter = require('express').Router();
import userRouter from './userRouter';
import legislatorRouter from './legislatorRouter';
import tweetRouter from './tweetRouter';

apiRouter.use(
  userRouter,
  legislatorRouter,
  tweetRouter
);

export default apiRouter
