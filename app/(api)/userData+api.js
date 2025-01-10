import connect from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    console.log("connecting.. ");
    await connect();
    const { token } = await request.json();
    // console.log("token api==================================", token);

    const user = jwt.verify(token, process.env.jwtSecret);

    // const userName = user.username;
    // console.log("user====", userName);

    const currentUser = await User.findOne({ username: user.username });

    if (currentUser) {
      // console.log("current user -----", currentUser);
      return Response.json({
        status: "ok",
        data: currentUser,
      });
    }
  } catch (error) {
    return Response.json({
      error: error,
      message: "Cannot find user",
      status: 400,
    });
  }
}
