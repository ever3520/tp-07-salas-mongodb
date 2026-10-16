# Trabajo práctico 07
Este el práctico número 7 del curso de desarrollo web full stack
## Punto de partida y nombre de la copia
Proyecto de partida: TP-06 Reserva de salas
Nombre de la copia: TP-07 Reserva de salas MongoDB

Este trabajo se realizó tomando como base el proyecto desarrollado en el trabajo práctico anterior y adaptándolo para incorporar persistencia de datos mediante MongoDB Atlas y Mongoose.
## Versiones utilizadas y uso de Atlas Free (M0)
Tecnologías utilizadas
* Node.js v24.14.0
* MongoDB Atlas
* MongoDB Atlas Free Tier (M0)
* Mongoose v9.11.1
* Express
## Confirmación de uso de Atlas Free (M0)
La base de datos se creó utilizando un cluster gratuito de MongoDB Atlas que corresponde al plan gratuito M0 Free Tier con la finalidad de aprender sobre base de datos y hacer proyectos pequeños
## Instalación y puesta en marcha desde una nueva descarga
Clonar o descargar repositorio
git clone 'dirección del repositorio'

cd tp-07-salas-mongodb
## Instalar dependencias
Ejecutar el comando en terminal: npm install
## Crear el cluster gratuito en MongoDB Atlas
1. Crear una cuenta en MongoDB Atlas
2. Crear un nuevo cluster Free Tier (M0)
3. Esperar a que finalice el aprovisionamiento
## Crear usuario de base de datos
Desde Atlas:

* Database Access
* Add New Database User

Configurar:

* Usuario
* Contraseña

Guardar dichas credenciales para la cadena de conexión.
## Habilitar direcciones IP
Desde Atlas:

* Network Access
* Add IP Address
## Configurar variables de entorno
Copiar la plantilla proporcionada

cp .env.example .env
## Ejecutar la aplicación
Se ejecuta con el comando: 'npm start' o con 'node src/index.js'
## Diagnóstico DNS y comandos utilizados
Problema encontrado

Durante las pruebas se produjeron errores de conexión al resolver el nombre del cluster de MongoDB Atlas.

Ajuste realizado

Se configuraron servidores DNS públicos:
````
const dns = require("node:dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);
````

Resolutores utilizados:

* Google DNS: 8.8.8.8
* Cloudflare DNS: 1.1.1.1
## Comprobación de conexión
Para verificar la conexión a la base de datos se ejecuta el comando: node --env-file=.env scripts/comprobar-conexion.js
## Creación
Para crear un nuevo registro: node --env-file=.env scripts/crear-reserva.js
## Listado
Para ver el listado de las reservas: node --env-file=.env scripts/listar-reservas.js
## Arranque web
Para ejecutar la aplicación web: npm start
## Mapa de archivos
src/
├── app.js
├── config/
│   ├── entorno.js
│   └── base-datos.js
├── models/
│   └── reserva.js
├── schemas/
│   └── reserva.js
├── routes/
│   └── reservas.js
└── controllers/
    └── reservas.js

scripts/
├── comprobar-conexion.js
├── crear-reserva.js
├── listar-reservas.js
## Esquema
El esquema define la estructura de los documentos que se guardan en MongoDB. También incluye las reglas de validación de cada campo.
## Modelo
El modelo actúa como interfaz entre la aplicación y la colección de MongoDB, permitiendo crear, consultar, modificar y eliminar documentos.
## Colección
La colección almacena físicamente los documentos en la base de datos. Cada instancia creada mediante el modelo queda almacenada en esta colección.
## Campos y reglas
estudiante

* Tipo: String
* Obligatorio
* trim habilitado
* No debe contener espacios al inicio o al final

email

* Tipo: String
* Obligatorio
* trim habilitado
* Debe contener el carácter "@"

sala

* Tipo: String
* Opciones permitidas:
    * Sala Norte
    * Sala Sur
    * Sala Este
    * Sala Oeste

fecha

* Tipo: String
* Obligatoria
## Observaciones sobre validaciones
Actualmente se controlan:

* Campos obligatorios
* Tipo de dato
* Valores permitidos
* Limpieza de espacios mediante trim

Todavía no se controlan:

* Superposición de reservas en la misma sala.
* Horarios fuera del horario de funcionamiento.
* Correos electrónicos mediante expresión regular completa.
* Límites máximos por usuario.
* Reservas duplicadas.
## Matriz de pruebas

Conexión válida: Conexión a la base de datos establecida correctamente.

Fallo DNS: Error al conectar a la base de datos: querySrv ECONNREFUSED _mongodb._tcp.cluster0.nyw5nn3.mongodb.net
Revisar MONGODB_URI, servidor, red y los permisos.

Variable vacía: Error al conectar a la base de datos: MONGODB_URI no está definido o es una cadena vacía
Revisar MONGODB_URI, servidor, red y los permisos

Contraseña incorrecta temporal en .env privado: Error al conectar a la base de datos: bad auth : authentication failed
Revisar MONGODB_URI, servidor, red y los permisos

Colección vacía: Total de reservas: 0
[]

Reserva válida: la reserva se guarda y devuelve el _id

Consulta desde nuevo proceso: Reserva creada. _id: 6ad18c730614ab9c0c1de136
new ObjectId('6ad18c730614ab9c0c1de136')

Segunda consulta: No se crean nuevos registros

Estudiante vacío: Fallo en la validación de la reserva, el campo de estudiante es requerido

Email sin @: Fallo en la validación de la reserva, el campo de email es requerido

Sala o turno no permitido: Fallo en la validación de la reserva, la sala y el turno no son permitidos

Fecha vacía: Fallo en la validación, la fecha es requerida

Personas 0: Fallo en la validación, la cantidad mínima es 1

Personas 7: Fallo en la validación, la cantidad indicada supera el máximo de 6 personas

Personas 2.5: Fallo en la validación, el número debe ser un entero entre 1 y 6

Personas con texto no numérico: Validación fallida, el dato ingresado es de tipo string, debe ser de tipo numérico
## Evidencia de persistencia
El sitio web continúa utilizando memoria para algunas operaciones temporales durante la ejecución de Node.js.

Sin embargo, la información principal ahora se almacena en MongoDB Atlas, permitiendo conservar los datos entre distintas ejecuciones de la aplicación.

En la Unidad 8 se profundizará en aspectos relacionados con:

* Operaciones CRUD completas.
* Actualización de documentos.
* Eliminación de registros.
* Consultas avanzadas.
* Relaciones entre colecciones.
* Manejo de errores y validaciones más sofisticadas.
## Seguridad y protección de credenciales
Se confirma que:

* El archivo .env no se encuentra publicado en el repositorio.
* Las credenciales de MongoDB Atlas no se comparten.
* No se incluyen usuarios reales ni contraseñas reales.
* No se publican datos personales de terceros.
* Se proporciona únicamente un archivo .env.example como plantilla de configuración.

De esta forma se mantienen buenas prácticas básicas de seguridad para el desarrollo de aplicaciones web.