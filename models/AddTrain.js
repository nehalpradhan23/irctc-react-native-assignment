import mongoose from "mongoose";

const trainSchema = new mongoose.Schema({
  trainName: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  seatCapacity: { type: String, required: true },
  sourceDate: { type: Date, required: true },
  sourceTime: { type: Date, required: true },
  destDate: { type: Date, required: true },
  destTime: { type: Date, required: true },
});

const NewTrain = mongoose.models.User || mongoose.model("Trains", trainSchema);
export default NewTrain;
