const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const path = require('node:path');
const { crearControladorReservas } = require("./controladores/reservas");
const { crearRutasReservas } = require("./rutas/reservas");
const { identificarSolicitud, medirDuracion } = require("./middleware/solicitudes");


function crearApp({servicioReservas, formatoRegistro}) {
    const app = express();
    const controladorReservas = crearControladorReservas(servicioReservas);

    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "..", "views"));
    app.set("layout", "layouts/main");
    app.use(morgan(formatoRegistro));
    app.use(identificarSolicitud);
    app.use(medirDuracion);
    app.use(expressLayouts);
    app.use(express.static(path.join(__dirname, "..", "public")));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.get("/", controladorReservas.mostrarInicio);
    app.get("/estado", controladorReservas.estado);
    app.use("/reservas", crearRutasReservas(controladorReservas));

    app.use((req, res) => {
        res.status(404).render("no-encontrado", {
            titulo: "Página no encontrada",
            mensaje: "La página solicitada no existe"
        });
    });

    return app;
}

module.exports = { crearApp };