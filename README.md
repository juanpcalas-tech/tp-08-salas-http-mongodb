# tp-08-salas-http-mongodb
Endpoints persistentes de reservas de salas

1. Origen de la copia
    El presente trabajo práctico se desarrolló a partir de una copia funcional del TP07.

    Proyecto base: tp-07-salas-mongodb

    Cambios principales incorporados:

    Integración completa de MongoDB Atlas con Express.
    Implementación de API REST sobre reservas.
    Persistencia real mediante Mongoose.
    Reutilización del servicio de reservas tanto por la API como por las vistas HTML.
    Manejo centralizado de errores.
    Validaciones de entrada para creación de reservas.

2. Tecnologías y versiones
    Node.js
    Express 5.2.1
    Mongoose 9.10.3
    ESLint 10.12.0
    Prettier 3.9.9
    MongoDB Atlas Free M0

3. Preparación de MongoDB Atlas
    Se Crea la base de datos:
        reservas_salas_u8
            |-> Coleccion: reservas

    Se Crea un usuario de base de datos.
    Obtener la cadena de conexión.
    Se configurA la variable MONGODB_URI.

4. Configuración del entorno
    Archivo .env basado en .env

    PORT=3000
    NODE_ENV=development
    MONGODB_URI="mongodb+srv://juanpcalas_db_user:clave@cluster0.ggyk4zc.mongodb.net/reservas_salas_u8?retryWrites=true&w=majority&appName=Cluster0"

5. Diagnostico DSNS Resolutores utilizados

    MongoDB Atlas utiliza registros DNS de tipo SRV y TXT para resolver las cadenas de conexión con prefijo mongodb+srv://. Durante el desarrollo se incorporó la configuración recomendada en la consigna dentro de src/config/base-datos.js:

    const dns = require("node:dns");
    dns.setServers(["8.8.8.8", "1.1.1.1"]);

6. Inicio
    * Instalación
    npm install

    * Inicio
    npm start

    * Servidor:
    http://localhost:3000
7. 
        tp-08-salas-http-mongodb/
        │
        ├── src/
        │ │
        │ ├── config/
        │ │ ├── entorno.js
        │ │ └── base-datos.js
        │ │
        │ ├── modelos/
        │ │ └── reserva.js
        │ │
        │ ├── controladores/
        │ │ └── reservas.js
        │ ├── rutas/
        │ │ └── reservas-api.js   
        │ │ └── reservas.js        
        │ ├── servicios/
        │ │ └── reservas-mongo.js    
        │ │ └── reservas.js        
        │ ├── middleware/
        │ │ └── errores.js
        │ │ └── reservas.js
        │ │ └── solicitudes.js
        │ ├── vistas/
        │ ├── app.js
        │ └── index.js
        │
        ├── scripts/
        │ ├── comprobar-conexion.js
        │ ├── crear-reserva.js
        │ └── listar-reservas.js
        │ └── validar-reserva.js        
        │
        ├── .env
        ├── .gitignore
        ├── eslint.config.js
        ├── package.json
        ├── package-lock.json
        └── README.md

8. Tabla de Endpoints
    | Método	| Endpoint	| Descripción|
    |GET	|/estado| Estado general|
    |GET	|/api/reservas|	Listado completo|
    |GET	|/api/reservas?sala=Sala Norte|	Filtrado|
    |GET	|/api/reservas/:id|	Detalle|
    |POST	|/api/reservas|	Crear reserva|

9. JASON ejemplo
    {
    "estudiante": "Ana Ejemplo",
    "email": "ana@example.com",
    "sala": "Sala Norte",
    "fecha": "2026-10-21",
    "turno": "Mañana",
    "personas": 2
    }

10. Validaciones
    
    * estudiante
    obligatorio
    no vacío
    
    * email
    obligatorio
    debe contener @
   
   * sala
    Sala Norte
    Sala Sur
    Sala Multimedia
    
    * turno
    Mañana
    Tarde
    Noche
    
    * personas
    entero
    mínimo 1
    máximo 6
    
    * fecha
    obligatoria    

11. Evidencias
    Evidencia 1
    GET /api/reservas

    Captura: docs/evidencias/01-get-reservas.png

    Evidencia 2
    POST /api/reservas

    Captura: docs/evidencias/02-post-reserva.png

    Evidencia 3
    Header Location

    Captura: docs/evidencias/03-location-header.png

    Evidencia 4
    GET por ID

    Captura: docs/evidencias/04-get-por-id.png

    Evidencia 5
    Documento almacenado en Atlas

    Captura: docs/evidencias/05-atlas-documento.png

    Evidencia 6
    Reinicio del servidor

    Captura: docs/evidencias/06-reinicio-servidor.png

    Evidencia 7
    Consulta posterior al reinicio

    Captura: docs/evidencias/07-persistencia-post-reinicio.png    

12. Comparación con TP07
        TP07	                        TP08
        Scripts independientes	        API integrada
        Mongo usado desde terminal	    Mongo usado desde HTTP
        Sin endpoint REST	            API REST completa
        Sin GET /estado	                GET /estado disponible
        Persistencia aislada	        Persistencia integrada
        Sin header Location	Header      Location implementado    

13. Reproducción de pruebas en Postman
        Listar reservas
        Método: GET

        URL: http://localhost:3000/api/reservas

        Body: No aplica

        Respuesta esperada: 200 OK

        []

        o

        [ {...} ]

        Crear reserva
        Método: POST

        URL: http://localhost:3000/api/reservas

        Headers:

        Content-Type: application/json

        Body:

            {
            "estudiante": "Ana Ejemplo",
            "email": "ana@example.com",
            "sala": "Sala Norte",
            "fecha": "2026-10-21",
            "turno": "Mañana",
            "personas": 2
            }

        Respuesta esperada:

        201 Created

        Header:

        Location: /api/reservas/{id}

        Obtener una reserva
        Método: GET

        URL: http://localhost:3000/api/reservas/{id}

        Respuesta esperada:

        200 OK