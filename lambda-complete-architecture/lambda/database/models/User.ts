import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);

UserSchema.pre("find", function () {
  this.select("-id -__v");
});
UserSchema.pre("findOne", function () {
  this.select("-id -__v");
});
UserSchema.pre("findOneAndUpdate", function () {
  this.select("-id -__v");
});
