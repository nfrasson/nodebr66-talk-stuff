import mongoose from "mongoose";

export const connectToDatabase = async () => {
  if (
    mongoose?.connection?.readyState !== mongoose.ConnectionStates.connecting &&
    mongoose?.connection?.readyState !== mongoose.ConnectionStates.connected
  ) {
    await mongoose.connect(process.env.MONGO_URI);
  }
};

// Configure listeners for mongoose connection events
mongoose.connection.on("connected", () => console.info("MONGO_CONNECTED"));
mongoose.connection.on("connecting", () => console.info("MONGO_CONNECTING"));

mongoose.connection.on("open", () => console.info("MONGO_CONNECTION_OPEN"));
mongoose.connection.on("close", () => console.warn("MONGO_CONNECTION_CLOSED"));
mongoose.connection.on("error", (error) => {
  console.error("MONGO_DB_ERROR", error);
});

mongoose.connection.on("disconnecting", () =>
  console.warn("MONGO_DISCONNECTING")
);
mongoose.connection.on("disconnected", () =>
  console.warn("MONGO_DISCONNECTED")
);
mongoose.connection.on("reconnected", () => console.info("MONGO_RECONNECTED"));

mongoose.connection.on("serverHeartbeatStarted", () =>
  console.info("MONGO_HEARTHBEAT_STARTED")
);
mongoose.connection.on("serverHeartbeatSucceeded", () =>
  console.info("MONGO_HEARTHBEAT_SUCCESS")
);
mongoose.connection.on("serverHeartbeatFailed", () =>
  console.warn("MONGO_HEARTHBEAT_FAILED")
);
