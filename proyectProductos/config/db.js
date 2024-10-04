const {Pool} = require('pg');
// Importa el constructor 'Pool' del módulo 'pg' para manejar la conexión a PostgreSQL.
require('dotenv').config();
// Carga las variables de entorno desde el archivo .env para acceder a las credenciales de la base de datos.

const pool = new Pool ({
    // Crea una nueva instancia de 'Pool', que es un grupo de conexiones para PostgreSQL.
// Se configuran las credenciales de conexión usando las variables de entorno definidas en el archivo .env.
    host:process.env.DB_HOST,
    // Define el host (dirección del servidor de base de datos) desde la variable de entorno 'DB_HOST'.
    user:process.env.DB_USER,
    // Define el usuario de la base de datos desde la variable de entorno 'DB_USER'.
    password:process.env.DB_PASSWORD,
     // Define la contraseña de la base de datos desde la variable de entorno 'DB_PASSWORD'.
    database:process.env.DB_NAME,
      // Define el nombre de la base de datos desde la variable de entorno 'DB_NAME'.
});

module.exports = pool;
// Exporta el pool de conexiones para que pueda ser utilizado en otros archivos del proyecto.