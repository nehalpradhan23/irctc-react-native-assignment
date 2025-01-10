import connect from "@/lib/mongodb";
import NewTrainBooking from "@/models/BookTrain";

export async function POST(request) {
  try {
    // console.log("fetching all booked trains -----------------");
    await connect();
    const { username } = await request.json();

    if (!username) {
      return new Response({
        error: "username required",
        status: 400,
      });
    }
    const bookings = await NewTrainBooking.find({ username });

    return new Response(JSON.stringify({ status: "ok", data: bookings }));
  } catch (error) {
    console.log("error fetching all bookings", error);
    return new Response(
      JSON.stringify({ status: "error", message: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
