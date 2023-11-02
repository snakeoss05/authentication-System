import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserDao from "../DAO/UserDAO.js";

dotenv.config();

export default class UserController {
  static async registerUser(req, res) {
    const { username, email, password } = req.body;

    try {
      const saltRounds = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const result = await UserDao.registerUser(
        username,
        email,
        hashedPassword
      );
      if (result.error) {
        return res.status(400).send(result.error);
      }

      res.status(200).send("Register Success");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error.");
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;

    const secretOrPrivateKey = process.env.ACCESS_TOKEN_SECRET;
    const user = await UserDao.loginUser(email);

    try {
      if (!user) {
        return res.status(404).send("User not registered.");
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(401).send("Wrong password.");
      }

      const token = jwt.sign({ _id: user._id }, secretOrPrivateKey);

      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error.");
    }
  }
}
