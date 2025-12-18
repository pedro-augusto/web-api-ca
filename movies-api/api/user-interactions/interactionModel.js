import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const InteractionSchema = new Schema({
  interactionId: { type: String, unique: true, required: true},
  movieId: {type: Number, required: true},
  interactionDate: Date,
  interactionType: {type: String, enum: ["Must Watch","Favourite"]},
});

export default mongoose.model('Interaction', InteractionSchema);