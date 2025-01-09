import connect from "@/lib/mongodb";
import NewTrain from "@/models/AddTrain";

export async function POST(request) {
  try {
    console.log("connecting.. ");
    await connect();
    const {
      trainName,
      source,
      destination,
      seatCapacity,
      sourceDate,
      sourceTime,
      destDate,
      destTime,
    } = await request.json();

    const newTrain = new NewTrain({
      trainName,
      source,
      destination,
      seatCapacity,
      sourceDate,
      sourceTime,
      destDate,
      destTime,
    });

    await newTrain.save();

    return Response.json({
      data: newTrain,
      message: "New train added",
      status: 200,
    });
  } catch (error) {
    // console.log(error);
    return Response.json({
      error: error,
      message: "Cannot add train",
      status: 400,
    });
  }
}
