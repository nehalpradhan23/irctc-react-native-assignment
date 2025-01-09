import connect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    console.log("connecting.. ");
    await connect();
    const { username, email, password, isAdmin } = await request.json();

    // const userExists = await User.findOne({ $or: [{ email }, { username }] });

    // if (userExists) {
    //   // You can provide specific error messages based on the condition that failed
    //   if (userExists.email === email) {
    //     return Response.json(
    //       { error: "Email already in use" },
    //       { status: 400 }
    //     );
    //   }
    //   if (userExists.username === username) {
    //     return Response.json(
    //       { error: "Username already in use" },
    //       { status: 400 }
    //     );
    //   }
    // }

    // const userExists = await User.findOne({ email });
    // if (userExists) {
    //   return Response.json({ error: "user already exists" }, { status: 400 });
    // }

    // const usernameExists = await User.findOne({ username });
    // if (usernameExists) {
    //   return Response.json(
    //     { error: "username already exists" },
    //     { status: 400 }
    //   );
    // }

    const newUser = new User({
      username,
      email,
      password,
      isAdmin,
    });

    await newUser.save();

    return Response.json({
      data: newUser,
      message: "Account successfully created",
      status: 200,
    });
  } catch (error) {
    // console.log(error);
    return Response.json({
      error: error,
      message: "Cannot create user",
      status: 400,
    });
  }
}
