// import { connect } from "mongoose"
import mongoose, { Mongoose } from "mongoose"
// import dotenv from "dotenv"

// dotenv.config()

// export async function connection(){
//     try{
//         await connect(process.env.MONGODB_URL as string)
//         console.log("Conectado")
//     }
//     catch (error){
//         console.log("Conección falló "+error)
//     }
// }
global.mongoose = {
    conn: null,
    promise: null,
  };
  
  export async function dbConnect() {
    try {

      // if there is already a connection to the db, return it
      if (global.mongoose && global.mongoose.conn) {
        // console.log("Connected from previous");
        return global.mongoose.conn;

      // if there isn´t a connection, connect it
      } else { 
        const conString = process.env.MONGODB_URL;
  
        const promise = mongoose.connect(conString, {
          autoIndex: true,
        });
  
        global.mongoose = {
          conn: await promise,
          promise,
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
    mongoose.disconnect();
  };