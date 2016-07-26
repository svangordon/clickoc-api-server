import User from '../model/user.model';

export default {
  validateLegs: function validateLegs (twitterId) {
    const query = {twitterId}
    User.findOne(query, (err, user) => {
      console.log('this ==', this,'validating user', twitterId, '\nlegs ==', user.legs);
      
    });
  }
}
