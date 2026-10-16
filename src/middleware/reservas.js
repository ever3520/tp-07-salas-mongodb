function prepararSalas(req, res, next) {
    res.locals.seccion = "Reservas de salas";
    next();
}

function validarReserva(req, res, next) {
    const estudiante = String(req.body.estudiante ?? '').trim();
    const email = String(req.body.email ?? '').trim();
    const sala = String(req.body.sala ?? '').trim();
    const fecha = String(req.body.fecha ?? '').trim();
    const turno = String(req.body.turno ?? '').trim();
    const personas = Number(req.body.personas);

    if (!estudiante || !email || !sala || !fecha || !turno || !Number.isFinite(personas) || personas <= 0 || personas > 6) {
        return res.status(400).render("reservas/nueva", {
            titulo: "Nueva sala",
            error: "Completa los campos con datos válidos. Y la cantidad de personas entre 1 y 6",
            valores: req.body
        });
    }

    req.reservaValidada = { estudiante, email, sala, fecha, turno, personas };
    next();
}

module.exports = { prepararSalas, validarReserva };