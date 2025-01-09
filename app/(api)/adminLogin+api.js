import connect from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    console.log("connecting.. ");
    await connect();
    const { username, password } = await request.json();

    const oldUser = await User.findOne({ username });

    if (!oldUser) {
      return Response.json({
        error: oldUser,
        message: "Cannot find user",
        status: 400,
      });
    }

    if (oldUser.isAdmin === false) {
      return Response.json({
        message: "Not an admin account",
        status: 400,
      });
    }

    // console.log(oldUser);

    if (password === oldUser.password) {
      console.log("checking password");

      const token = jwt.sign(
        {
          username: oldUser.username,
        },
        process.env.jwtSecret
      );

      return Response.json({
        status: "ok",
        data: token,
        status_code: 200,
        message: "login success",
        user_id: oldUser._id.toString(),
        isAdmin: oldUser.isAdmin,
      });
    } else {
      return Response.json({ error: "error", message: "wrong password" });
    }
  } catch (error) {
    // console.log(error);
    return Response.json({
      error: error,
      message: "Cannot create user",
      status: 400,
    });
  }
}
