function crearControladorReservas(servicio) {
    async function listar(req, res) {
        const reservas = await servicio.listar();
        res.render("reservas/lista", {
            titulo: "Reserva Salas",
            reservas,
        });
    }

    function mostrarFormulario(req, res) {
        res.render("reservas/nueva", {
            titulo: "Nueva reserva",
            error: null,
            valores: {},
        });
    }

    function mostrarDetalle(req, res) {
        const id = Number(req.params.id);
        const reserva = servicio.obtenerPorId(id);
        if (!reserva) {
            return res.status(404).render("no-encontrado", {
                titulo: "Reserva no encontrada",
                mensaje: "No existe una reserva con ese identificador.",
            });
        }
        res.render("reservas/detalle", { titulo: reserva.estudiante, reserva });
    }

    async function crear(req, res) {
        await servicio.crear(req.reservaValidada);
        res.redirect("/reservas");
    }

async function estado(req, res) {
    const cantidad = await servicio.contar();
    res.status(200).json({
        servicio: "Activo",
        reservas: cantidad,
        idSolicitud: res.locals.idSolicitud,
    });
}

    async function listarApi(req, res) {
        const reservas = await servicio.listar(req.query.sala);
        res.json(reservas);
    }

    async function obtenerApi(req, res) {
        const reserva = await servicio.obtenerPorId(req.params.id);
        if (!reserva) {
            return res.status(404).json({ error: "Reserva no encontrada." });
        }
        res.json(reserva);
    }

    async function crearApi(req, res) {
        const reserva = await servicio.crear(req.reservaValidada);
        res.location(`/api/reservas/${reserva.id}`).status(201).json(reserva);
    }

    return { listar, mostrarFormulario, mostrarDetalle ,crear, estado, listarApi, obtenerApi, crearApi };
}
module.exports = { crearControladorReservas };

