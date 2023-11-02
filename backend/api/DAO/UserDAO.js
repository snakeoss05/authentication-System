import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import User from "../Models/Userschema.js";

dotenv.config();
let connection;

export default class UserDao {
  static async injectDB() {
    if (connection) {
      return;
    }

    try {
      const client = await MongoClient.connect(process.env.URI_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      connection = client.db("Productlist").collection("UserList");

      console.log("Connected to MongoDB!");
    } catch (error) {
      console.error(`Unable to connect to MongoDB: ${error}`);
    }
  }

  static async registerUser(username, email, hashedPassword) {
    try {
      const existingUser = await connection.findOne({ email: email });
      if (existingUser) {
        return { error: "User already exists" };
      }

      const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
      });

      const savedUser = await connection.insertOne(newUser);

      return savedUser;
    } catch (error) {
      console.log(error);
      return { error: "Server error" };
    }
  }

  static async loginUser(email) {
    try {
      const user = await connection.findOne({ email: email });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
