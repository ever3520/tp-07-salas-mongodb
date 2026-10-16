function crearControladorReservas(servicioReservas) {

    function mostrarInicio(req,res) {
        res.render("inicio", { titulo: "Salas de estudio" });
    }

    function listar(req,res) {
        res.render("reservas/lista", {
            titulo: "Salas disponibles",
            salasDeEstudio: servicioReservas.listar(),
        });
    }

    function mostrarFormulario(req,res) {
        res.render("reservas/nueva", {
            titulo: "Nueva reserva",
            error: null,
            valores: {},
            salasPermitidas: servicioReservas.listarReservasPermitidas(),
            turnosPermitidos: servicioReservas.listarTurnosPermitidos()
        });
    }

    function buscarReserva(req,res) {
        const id = Number(req.params.id);
        const sala = servicioReservas.buscarPorId(id);
        if (!sala) {
            return res.status(404).render("no-encontrado", {
                titulo: "Reserva no encontrada",
                mensaje: "No se pudo encontrar la reserva con el identificador indicado"
            });
        }
        res.render("reservas/detalle", {
            titulo: sala.estudiante,
            sala
        });
    }

    function crear(req,res) {
        servicioReservas.crear(req.reservaValidada);
        res.redirect("/reservas");
    }

    function estado(req,res) {
        res.json({
            servicio: "activo",
            reservas: servicioReservas.contar(),
            solicitudId: res.locals.solicitudId
        });
    }

    return { mostrarInicio, listar, mostrarFormulario, buscarReserva, crear, estado };
}

module.exports = { crearControladorReservas };