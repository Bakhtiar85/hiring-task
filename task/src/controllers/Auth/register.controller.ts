import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { encryptPassword } from "../../utils/encrypt";
import httpStatus from "http-status";

const registerHandler = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user with the given email already exists
  const existingUser = await userService.getOneUser({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email is already registered" }); // 409 Conflict
  }

  // Encrypt the password
  const hashPassword = await encryptPassword(password);

  // Create the new user
  const user = await userService.createUser({
    username,
    email,
    password: hashPassword,
  });
  res.json({ user }).status(httpStatus.CREATED);
};

export const registerController = errorHandlerWrapper(registerHandler);
