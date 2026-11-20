# Gimnasio API

API REST para gestionar un gimnasio: socios, clases e inscripciones. Hecha con Node.js (ES Modules), Express y Zod, con arquitectura en capas.

## Entidades

- **Socio:** nombre, dni, email y plan (mensual, trimestral o anual).
- **Clase:** nombre, instructor, día, horario y cupo.
- **Inscripción:** relaciona a un socio con una clase (`socioId` y `claseId`).

## Relación entre entidades

Un socio puede tener muchas inscripciones y una clase puede tener muchas inscripciones (relación 1 a N). Entre socios y clases hay una relación de muchos a muchos, que se resuelve con la inscripción como tabla intermedia.

Socio (1) ────< Inscripción >──── (1) Clase

Reglas de negocio (están en los casos de uso):

- No se puede repetir el DNI de un socio (409).
- Para inscribir, el socio y la clase tienen que existir (404).
- No se puede inscribir dos veces al mismo socio en la misma clase (409).
- No se puede inscribir si la clase ya llegó a su cupo (409).
- Al borrar un socio o una clase, se borran sus inscripciones.

## Instalación y ejecución

1. Instalar las dependencias:

npm install

2. Crear el archivo `.env` a partir del ejemplo:

copy .env.example .env

3. Arrancar el servidor:

npm run dev

El servidor queda en `http://localhost:3000` y los endpoints bajo `/api`.

## Variables de entorno

| Variable | Descripción | Valor por defecto |
|---|---|---|
| PORT | Puerto del servidor | 3000 |
| PERSISTENCE_TYPE | Tipo de persistencia: `memory` o `sequelize` | memory |
| DB_STORAGE | Ruta del archivo SQLite (solo con `sequelize`) | ./database.sqlite |

## Cambiar de persistencia

Se elige con la variable `PERSISTENCE_TYPE` del archivo `.env`:

- `memory`: los datos se guardan en arrays y se pierden al reiniciar el servidor.
- `sequelize`: los datos se guardan en una base SQLite (Sequelize) y se conservan entre reinicios. Las tablas se crean solas al arrancar.

Después de cambiar el valor hay que reiniciar el servidor. Los dos modos usan DAO con la misma interfaz y responden igual. No hace falta tocar rutas, controladores ni casos de uso, porque la elección la hace `dao/daoFactory.js`.

## Documentación de la API

La documentación (OpenAPI 3 con Swagger UI) está en:

http://localhost:3000/api-docs

Desde ahí se puede probar cada endpoint con "Try it out".

## Evento implementado

Cuando se crea una inscripción, el caso de uso emite el evento `inscripcion.creada`. Un listener separado (`listeners/registerInscripcionListeners.js`) lo escucha y manda un aviso por consola a través de un notificador (`notifiers/consoleNotifier.js`).

El caso de uso no sabe quién escucha el evento: para notificar de otra forma (por ejemplo a un archivo) alcanza con cambiar el notificador. El listener atrapa sus propios errores, así que si falla la notificación no se cae la inscripción.

## Pruebas

El archivo `pruebas.http` tiene pruebas de todos los endpoints y de los errores 400, 404 y 409. Se corren con la extensión REST Client de VS Code. Conviene reiniciar el servidor antes (y borrar `database.sqlite` si se usa `sequelize`), porque los ids arrancan en 1.

## Estructura del proyecto

- `routes/`: rutas de Express.
- `controllers/`: traducen el resultado de los casos de uso a respuestas HTTP.
- `usecases/`: reglas de negocio.
- `dao/`: acceso a datos. `memory/` y `sequelize/` tienen los dos adaptadores, `models/` los modelos de Sequelize y `daoFactory.js` elige cuál usar.
- `schemas/`: validaciones con Zod.
- `middlewares/`: validación, notFound y manejo de errores.
- `errors/`: errores de dominio (`AppError`).
- `config/`: configuración leída desde variables de entorno.
- `connection/`: conexión de Sequelize.
- `container/`: arma las dependencias y entrega el router principal.
- `notifiers/` y `listeners/`: notificador y listener del evento.
- `docs/`: documentación OpenAPI y Swagger UI.

## Tecnologías

Node.js (ES Modules), Express, Zod, Sequelize, SQLite, Swagger UI (OpenAPI 3).

## Cómo viaja un pedido

Ruta → validate (Zod) → Controlador → Caso de uso → DAO → datos

- **Ruta:** decide qué función atiende cada URL.
- **validate:** revisa con Zod que los datos sean correctos (si no, 400).
- **Controlador:** arma la respuesta HTTP.
- **Caso de uso:** aplica las reglas de negocio.
- **DAO:** lee y escribe los datos, en memoria o en SQLite.