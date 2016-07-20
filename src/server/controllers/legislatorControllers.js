// Controllers for legislator routes

import request from 'request';
import sunlightCongressApi from 'sunlight-congress-api';
sunlightCongressApi.init(require('../config').SUNLIGHT.KEY);


let controllerMethods = {
  /*
    Takes a lattitude & longitude in the req, and sets the user's legislators
    based on the info returned from a call to the sunlight congress api
  */
  test: function (req, res) {
    const success = function(data) { res.send(data) }
    console.log(sunlightCongressApi.legislatorsLocate().addZipCode(80304))
    sunlightCongressApi.legislatorsLocate().addZipCode(80304).call(success)
  }
}

export default controllerMethods
