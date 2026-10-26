const express = require("express");
const { validarDatosReserva } = require("../middleware/reservas");

function crearRouterReservasApi(controlador) {
    const router = express.Router();
    router.get("/", controlador.listarApi);
    router.get("/:id", controlador.obtenerApi);
    router.post("/", validarDatosReserva, controlador.crearApi);
    return router;
}
module.exports = { crearRouterReservasApi };