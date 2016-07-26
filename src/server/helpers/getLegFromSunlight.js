import sunlightCongressApi from 'sunlight-congress-api';
sunlightCongressApi.init(require('../config').SUNLIGHT.KEY);

/*
  Takes an object with lat/lng coord, returns a promise w/ sunlights leg's for those coord.
  Actually this is short enough that we probably don't need it, but i like the idea of having
  all the ways that the cerver connects w/ outside api's bundled in one place. except that it's not
  like that? eh.
*/

export default function getLegFromSunlight ({lat, lng}) {
  return sunlightCongressApi.legislatorsLocate().addCoordinates({latitude: lat, longitude: lng}).call()
}
