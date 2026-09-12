import { ObjectId } from "mongodb";
import { obtenerBD } from "../common/db.js";

const actorCollection = "actorCollection";
const peliculaCollection = "peliculas";


export async function handleInsertActorRequest(req, res) {

    try {

        const db = obtenerBD();

        const actor = req.body;

        if (!actor.idPelicula) {
            return res.status(400).json({
                error: "Debe indicar la película del actor"
            });
        }

        if (!ObjectId.isValid(actor.idPelicula)) {
            return res.status(400).json({
                error: "El idPelicula no tiene un formato válido"
            });
        }

        const pelicula = await db
            .collection(peliculaCollection)
            .findOne({
                _id: new ObjectId(actor.idPelicula)
            });

        if (!pelicula) {
            return res.status(404).json({
                error: "La película indicada no existe"
            });
        }

        const resultado = await db
            .collection(actorCollection)
            .insertOne(actor);

        res.status(201).json({
            mensaje: "Actor agregado correctamente",
            id: resultado.insertedId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al agregar el actor"
        });
    }
}


export async function handleGetActoresRequest(req, res) {

    try {

        const db = obtenerBD();

        const actores = await db
            .collection(actorCollection)
            .find({})
            .toArray();

        res.status(200).json(actores);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al obtener los actores"
        });
    }
}


export async function handleGetActorByIdRequest(req, res) {

    try {

        const db = obtenerBD();

        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "ID de actor inválido"
            });
        }

        const actor = await db
            .collection(actorCollection)
            .findOne({
                _id: new ObjectId(id)
            });

        if (!actor) {
            return res.status(404).json({
                error: "Actor no encontrado"
            });
        }

        res.status(200).json(actor);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al obtener el actor"
        });
    }
}


export async function handleGetActoresByPeliculaIdRequest(req, res) {

    try {

        const db = obtenerBD();

        const idPelicula = req.params.pelicula;

        const actores = await db
            .collection(actorCollection)
            .find({
                idPelicula: idPelicula
            })
            .toArray();

        res.status(200).json(actores);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al obtener los actores de la película"
        });
    }
}


/* =====================================================
   ACTUALIZAR ACTOR
   PUT /api/actor/:id
   ===================================================== */

export async function handleUpdateActorRequest(req, res) {

    try {

        const db = obtenerBD();

        const id = req.params.id;
        const actor = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "ID de actor inválido"
            });
        }

        // Si se está modificando la película, verificamos que exista
        if (actor.idPelicula) {

            if (!ObjectId.isValid(actor.idPelicula)) {
                return res.status(400).json({
                    error: "El idPelicula no tiene un formato válido"
                });
            }

            const pelicula = await db
                .collection(peliculaCollection)
                .findOne({
                    _id: new ObjectId(actor.idPelicula)
                });

            if (!pelicula) {
                return res.status(404).json({
                    error: "La película indicada no existe"
                });
            }
        }

        const resultado = await db
            .collection(actorCollection)
            .updateOne(
                {
                    _id: new ObjectId(id)
                },
                {
                    $set: actor
                }
            );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({
                error: "Actor no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Actor actualizado correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al actualizar el actor"
        });
    }
}


/* =====================================================
   ELIMINAR ACTOR
   DELETE /api/actor/:id
   ===================================================== */

export async function handleDeleteActorRequest(req, res) {

    try {

        const db = obtenerBD();

        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "ID de actor inválido"
            });
        }

        const resultado = await db
            .collection(actorCollection)
            .deleteOne({
                _id: new ObjectId(id)
            });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({
                error: "Actor no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Actor eliminado correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al eliminar el actor"
        });
    }
}