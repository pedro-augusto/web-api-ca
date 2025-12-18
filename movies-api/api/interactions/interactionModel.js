import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const InteractionSchema = new Schema({
  movieId: {type: Number, required: true},
  username: { type: String, required: true },
  interactionDate: { type: Date, default: Date.now },
  interactionType: {type: String, enum: ["Must Watch","Favourite"], required: true},
});

export default mongoose.model('Interaction', InteractionSchema);