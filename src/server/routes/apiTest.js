let testRouter = require('express').Router();

testRouter.route('/test')
  .get(function(req, res) {
    res.send('well done')
  })

export default testRouter
