import { MongoClient } from "mongodb";
import "dotenv/config";

const client = new MongoClient(process.env.MONGODB_URI);

let db;

export async function conectarBD() {
    try {
        await client.connect();

        db = client.db("cine-db");

        console.log("Conexión a MongoDB Atlas exitosa");

        return db;
    } catch (error) {
        console.error("Error al conectar con MongoDB Atlas:", error);
        throw error;
    }
}

export function obtenerBD() {
    if (!db) {
        throw new Error("La base de datos no está conectada");
    }

    return db;
}