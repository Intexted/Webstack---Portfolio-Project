import mongoose from "mongoose";

const connection = {
  isConnected: false,
};

async function connect() {
  try {
    if (connection.isConnected) {
      console.log("Already connected");
      return;
    }

    if (mongoose.connections.length > 0) {
      const state = mongoose.connections[0].readyState;
      if (state === 1 || state === 2) {
        connection.isConnected = true;
        console.log("Using existing connection");
        return;
      }
    }

    const db = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState === 1;
    console.log(
      connection.isConnected
        ? "New connection established"
        : "Connection failed"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

// Automatically attempt to connect when this module is imported
connect();

const db = { connect };
export default db;
