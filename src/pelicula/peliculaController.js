import { ObjectId } from "mongodb";
import { obtenerBD } from "../common/db.js";

const peliculaCollection = "peliculas";


export async function handleInsertPeliculaRequest(req, res) {

    try {

        const db = obtenerBD();

        const pelicula = req.body;

        const resultado = await db
            .collection(peliculaCollection)
            .insertOne(pelicula);

        res.status(201).json({
            mensaje: "Película agregada correctamente",
            id: resultado.insertedId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al agregar la película"
        });

    }
}


export async function handleGetPeliculasRequest(req, res) {

    try {

        const db = obtenerBD();

        const peliculas = await db
            .collection(peliculaCollection)
            .find({})
            .toArray();

        res.status(200).json(peliculas);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al obtener las películas"
        });

    }
}


export async function handleGetPeliculaByIdRequest(req, res) {

    try {

        const db = obtenerBD();

        const id = req.params.id;

        if (!ObjectId.isValid(id)) {

            return res.status(400).json({
                error: "ID de película inválido"
            });

        }

        const pelicula = await db
            .collection(peliculaCollection)
            .findOne({
                _id: new ObjectId(id)
            });

        if (!pelicula) {

            return res.status(404).json({
                error: "Película no encontrada"
            });

        }

        res.status(200).json(pelicula);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al obtener la película"
        });

    }
}


export async function handleUpdatePeliculaByIdRequest(req, res) {

    try {

        const db = obtenerBD();

        const id = req.params.id;

        if (!ObjectId.isValid(id)) {

            return res.status(400).json({
                error: "ID de película inválido"
            });

        }

        const resultado = await db
            .collection(peliculaCollection)
            .updateOne(
                {
                    _id: new ObjectId(id)
                },
                {
                    $set: req.body
                }
            );

        if (resultado.matchedCount === 0) {

            return res.status(404).json({
                error: "Película no encontrada"
            });

        }

        res.status(200).json({
            mensaje: "Película actualizada correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al actualizar la película"
        });

    }
}


export async function handleDeletePeliculaByIdRequest(req, res) {

    try {

        const db = obtenerBD();

        const id = req.params.id;

        if (!ObjectId.isValid(id)) {

            return res.status(400).json({
                error: "ID de película inválido"
            });

        }

        const resultado = await db
            .collection(peliculaCollection)
            .deleteOne({
                _id: new ObjectId(id)
            });

        if (resultado.deletedCount === 0) {

            return res.status(404).json({
                error: "Película no encontrada"
            });

        }

        res.status(200).json({
            mensaje: "Película eliminada correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al eliminar la película"
        });

    }
}