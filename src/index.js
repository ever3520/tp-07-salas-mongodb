const { leerConfiguracion } = require("./config/entorno");
const { crearServicioReservas } = require("./servicios/reservas");
const { crearApp } = require("./app");

const salasPermitidas = ["Sala Norte", "Sala Sur", "Sala Multimedia"];
const turnosPermitidos = ["Mañana", "Tarde", "Noche"];

const salasDeEstudio = [
    {
        id: 1,
        estudiante: "Matias Carrizo",
        email: "matiascarrizo25@gmail.com",
        sala: "Sala Norte",
        fecha: "2024-06-05",
        turno: "Mañana",
        personas: 3
    },
    {
        id: 2,
        estudiante: "Carlos Albarracin",
        email: "albarracincarlos145@gmail.com",
        sala: "Sala Sur",
        fecha: "2024-07-01",
        turno: "Tarde",
        personas: 2
    },
    {
        id: 3,
        estudiante: "Laura Andrada",
        email: "lauraandrada@gmail.com",
        sala: "Sala Multimedia",
        fecha: "2024-08-10",
        turno: "Noche",
        personas: 1
    },
    {
        id: 4,
        estudiante: "Maira Espeche",
        email: "mairaespeche235@gmail.com",
        sala: "Sala Multimedia1",
        fecha: "2024-08-10",
        turno: "Mañana",
        personas: 5
    }
];


try {

    const { puerto, formatoRegistro } = leerConfiguracion();
    const servicioReservas = crearServicioReservas(salasDeEstudio, salasPermitidas, turnosPermitidos);
    const app = crearApp({ servicioReservas, formatoRegistro });

    app.listen(puerto, ()=>{
        console.log(`Servidor corriendo en: http://localhost:${puerto}`);
    })
} catch (error) {
    console.error("Error al iniciar la aplicación:", error);
    process.exitCode = 1;
}