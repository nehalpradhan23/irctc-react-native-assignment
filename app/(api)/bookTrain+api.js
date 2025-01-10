import connect from "@/lib/mongodb";
import NewTrainBooking from "@/models/BookTrain";

export async function POST(request) {
  try {
    console.log("connecting.. ");
    await connect();

    const {
      username,
      trainName,
      source,
      destination,
      seatCapacity,
      sourceDate,
      sourceTime,
      destDate,
      destTime,
    } = await request.json();

    const newBooking = new NewTrainBooking({
      username,
      trainName,
      source,
      destination,
      seatCapacity,
      sourceDate,
      sourceTime,
      destDate,
      destTime,
    });

    await newBooking.save();

    return Response.json({
      data: newBooking,
      message: "Train booked successfully",
      status: 200,
    });
  } catch (error) {
    // console.log(error);
    return Response.json({
      error: error,
      message: "Cannot booki train",
      status: 400,
    });
  }
}
