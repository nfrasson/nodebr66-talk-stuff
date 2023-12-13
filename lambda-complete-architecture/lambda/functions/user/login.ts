import joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../database/models/User";
import { connectToDatabase } from "../../database/connection";
import { LambdaDefaultHandler } from "../../default-handler";

export const login = async (body: any) => {
  const { email, password } = body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  return { result: { token }, statusCode: 200 };
};

export const bodySchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(64).required(),
});

export const handler = new LambdaDefaultHandler(
  login,
  bodySchema,
  connectToDatabase
).handleAPIGatewayEvent;
