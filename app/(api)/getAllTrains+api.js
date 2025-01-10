import connect from "@/lib/mongodb";
import NewTrain from "@/models/AddTrain";

export async function GET() {
  try {
    // console.log("fetching all trains -----------------");
    await connect();
    const trains = await NewTrain.find();

    return new Response(JSON.stringify({ status: "ok", data: trains }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // console.log("error fetching all trains", error);
    return new Response(
      JSON.stringify({ status: "error", message: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
