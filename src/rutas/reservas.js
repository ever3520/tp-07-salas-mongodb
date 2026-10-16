const express = require('express');
const {
    prepararSalas, 
    validarReserva
} = require("../middleware/reservas");

function crearRutasReservas(controladorReservas) {
    const reservasRouter = express.Router();
    reservasRouter.use(prepararSalas);

    reservasRouter.get("/", controladorReservas.listar);
    reservasRouter.get("/nueva", controladorReservas.mostrarFormulario);
    reservasRouter.get("/:id", controladorReservas.buscarReserva);
    reservasRouter.post("/", validarReserva, controladorReservas.crear);
    return reservasRouter;
}

module.exports = { crearRutasReservas };