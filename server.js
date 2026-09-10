import express from "express";
import cors from "cors";

import { conectarBD } from "./src/common/db.js";

import peliculaRoutes from "./src/pelicula/routes.js";
import actorRoutes from "./src/actor/routes.js";

const app = express();

const PORT = process.env.PORT || 3000;


app.use(cors());

app.use(express.json());


// Ruta principal
app.get("/", (req, res) => {

    res.send("Bienvenido al cine Iplacex");

});


// Rutas
app.use("/api", peliculaRoutes);

app.use("/api", actorRoutes);



async function iniciarServidor() {

    try {

        await conectarBD();

        app.listen(PORT, "0.0.0.0", () => {

            console.log(
                `Servidor ejecutándose en el puerto ${PORT}`
            );

        });

    } catch (error) {

        console.error(
            "No fue posible iniciar el servidor"
        );

        process.exit(1);
    }

}


iniciarServidor();