let userRouter = require('express').Router();

userRouter.route('/user')
  .get(function(req, res) {
    res.send(req.user);
  })

export default userRouter
