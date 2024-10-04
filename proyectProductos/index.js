const express = require('express');
// Importa el módulo 'express' para crear la aplicación de servidor.
const ProductosRoutes = require('./routes/ProductosRoutes');
// Importa las rutas de productos desde el archivo 'ProductosRoutes'.
const Productos = require('./models/ProductosModel');
// Importa el modelo 'Productos' desde el archivo 'ProductosModel' (aunque no se utiliza explícitamente aquí).
require('dotenv').config();
// Carga las variables de entorno definidas en el archivo .env.

const app = express();
// Crea una instancia de la aplicación de Express.
app.use(express.json());
// Configura la aplicación para que pueda manejar datos en formato JSON en las solicitudes entrantes.

app.use('/api', ProductosRoutes);
// Define que todas las rutas definidas en 'ProductosRoutes' estarán precedidas por '/api' en la URL.
const PORT = process.env.PORT || 3000;
// Establece el puerto en el que se ejecutará el servidor, utilizando la variable de entorno 'PORT' o el puerto 3000 por defecto.
app.listen(PORT, () =>
    {
        console.log(`Server is running on port ${PORT}`);
    }
    // Inicia el servidor para que escuche en el puerto especificado y muestra un mensaje en la consola cuando el servidor esté en funcionamiento.
)