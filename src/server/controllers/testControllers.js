import request from 'request';

let controllerMethods = {
  test: function (req, res) {
    res.send('yo dog')
  }
}

export default controllerMethods
