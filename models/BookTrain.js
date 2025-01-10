import mongoose from "mongoose";

const bookTrainSchema = new mongoose.Schema({
  username: { type: String, required: true },
  trainName: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  seatCapacity: { type: String, required: true },
  sourceDate: { type: Date, required: true },
  sourceTime: { type: Date, required: true },
  destDate: { type: Date, required: true },
  destTime: { type: Date, required: true },
  seatNumber: { type: String, required: true },
});

const NewTrainBooking =
  mongoose.models.User || mongoose.model("Bookings", bookTrainSchema);
export default NewTrainBooking;
