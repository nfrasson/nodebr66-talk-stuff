import joi from "joi";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { User } from "../../database/models/User";
import { connectToDatabase } from "../../database/connection";
import { LambdaDefaultHandler } from "../../default-handler";

export const register = async (body: any) => {
  const { name, email, password } = body;

  const user = await User.create({
    id: randomUUID(),
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });

  return { result: user, statusCode: 201 };
};

export const bodySchema = joi.object({
  name: joi.string().max(128).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(64).required(),
});

export const handler = new LambdaDefaultHandler(
  register,
  bodySchema,
  connectToDatabase
).handleAPIGatewayEvent;
