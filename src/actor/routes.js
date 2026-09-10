import express from "express";

import {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
} from "./actorController.js";


const actorRoutes = express.Router();


actorRoutes.post(
    "/actor",
    handleInsertActorRequest
);


actorRoutes.get(
    "/actores",
    handleGetActoresRequest
);


actorRoutes.get(
    "/actor/:id",
    handleGetActorByIdRequest
);


actorRoutes.get(
    "/actores/pelicula/:pelicula",
    handleGetActoresByPeliculaIdRequest
);


export default actorRoutes;