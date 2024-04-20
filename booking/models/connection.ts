import { connect } from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export async function connection(){
    try{
        await connect(process.env.BASE_URL)
        console.log("Conectado")
    }
    catch (error){
        console.log("Conección falló "+error)
    }
}
