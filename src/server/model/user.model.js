/**
 * Created by Peter on 18/04/15.
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  twitter         : {
    id            : {type: String, required: true},
    token         : String,
    tokenSecret   : String,
    displayName   : {type: String, required: true},
    username      : String,
    picture       : String,
    creationDate  : {type: Date, default: Date.now},
    updateDate    : {type: Date, default: Date.now}
  },
  legs : {
    lastUpdated   : {type: Date, default: Date.now},
    legislators   : [{type: String, ref: 'Legislator'}]
  }, // track the sunlight id's of legislators
  location        : {
    lat           : {type: Number, default: -9999}, // xxx: can this just be null?
    lng           : {type: Number, default: -9999}
  }
});

userSchema.path('twitter.displayName').required(true, 'Display name is required');
userSchema.path('twitter.id').required(true, 'Twitter id is required');

export default mongoose.model('User', userSchema);
