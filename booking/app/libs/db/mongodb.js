import { connect } from "mongoose"

global.mongoose = {
  conn: null,
  promise: null,
};

export async function connectDb() {
  try {

    // if there is already a connection to the db, return it
    if (global.mongoose && global.mongoose.conn) {
      // console.log("Connected from previous");
      return global.mongoose.conn;

    // if there isn´t a connection, connect it
    } else { 
      const conString = process.env.MONGODB_URL;
      const promise = connect(conString, { autoIndex: true });

      global.mongoose = {
        conn: await promise,
        promise
      };

      // console.log("Newly connected");
      return await promise;
    }
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
}

export const disconnect = () => {
  if (!global.mongoose.conn) {
    return;
  }
  global.mongoose.conn = null;
  moongose.disconnect();
};