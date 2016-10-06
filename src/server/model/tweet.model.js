import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  tweetContent: Schema.Types.Mixed
}, {
  timestamps: true
});

export default mongoose.model('Tweet', tweetSchema);
