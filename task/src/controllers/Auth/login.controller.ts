import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { generateToken } from "../../utils/generate";
import { comparePassword } from "../../utils/password";
import httpStatus from "http-status";

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await userService.getOneUser({ email });

  if (!findUser) {
    return res.status(404).json({ message: "User not found" });
  }

  if (findUser.deletedAt) {
    return res.status(403).json({ message: "Account has been deactivated" });
  }

  const compare = await comparePassword(password, findUser.password);
  if (!compare) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(findUser.uuid);
  res.json({ token }).status(httpStatus.ACCEPTED);
};

export const loginController = errorHandlerWrapper(loginHandler);
