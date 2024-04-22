import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config()

export async function connectDb() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("La variable de entorno MONGO_URI no está definida.");
        }

        await connect(process.env.MONGO_URI);
        console.log("Conexión exitosa a la base de datos.");
        return;

    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
}



