import express from "express";

import {

    handleInsertActorRequest,

    handleGetActoresRequest,

    handleGetActorByIdRequest,

    handleGetActoresByPeliculaIdRequest,

    handleUpdateActorRequest,

    handleDeleteActorRequest

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


actorRoutes.put(

    "/actor/:id",

    handleUpdateActorRequest

);


actorRoutes.delete(

    "/actor/:id",

    handleDeleteActorRequest

);


export default actorRoutes;