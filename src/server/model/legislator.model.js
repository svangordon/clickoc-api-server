import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const legislatorSchema = new Schema({
  sunlightId : String,

  twitterId: String,

  updateDate : {type: Date, default: Date.now}

  // Info about what to call the pol
  bioInfo: {
    birthday: String,
    firstName: String,
    nickName: String, // if present, probably the name they go by
    lastName: String,
    middleName: String,
    nameSuffix: String,
    title: String,
    gender: String
  },

  // info about the pol's office
  poliInfo : {
    state: {
      type: String,
      match: /^[A-Z]{2}$/
    },
    stateName: String,
    party: {
      type: String,
      enum: ['R', 'D', 'I']
    },
    district: Number,
    stateRank: {
      type: String,
      enum: ['junior', 'senior']
    }
  }
});

export default mongoose.model('Legislator', legislatorSchema);
