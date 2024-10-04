const express = require('express');
// Importa el módulo 'express' para crear el enrutador.
const ProductosController = require('../controllers/ProductosController');
// Importa el controlador 'ProductosController' desde la ubicación especificada.

const router = express.Router();
// Crea una nueva instancia del enrutador de Express.

router.get('/productos', ProductosController.getAllProductos);
// Define una ruta HTTP GET para obtener todos los productos. 
// Cuando se hace una solicitud GET a '/productos', se ejecuta el método 'getAllProductos' del controlador 'ProductosController'.
router.get('/productos/:id', ProductosController.getProductosById);
router.put('/productos/:id', ProductosController.updateProductos);
// Define una ruta HTTP GET para obtener un producto por su ID.
// Cuando se hace una solicitud GET a '/productos/:id', se ejecuta el método 'getProductosById', pasando el parámetro 'id' desde la URL.
router.post('/productos', ProductosController.createProductos);
// Define una ruta HTTP POST para crear un nuevo producto.
// Cuando se hace una solicitud POST a '/productos', se ejecuta el método 'createProductos' del controlador.
router.get('/productos/search/:id', ProductosController.searchAllColumns);
// Define una ruta HTTP GET para buscar productos en todas las columnas usando un ID de búsqueda.
// Se ejecuta el método 'searchAllColumns' del controlador cuando se hace una solicitud GET a '/productos/search/:id'.
router.get('/excel', ProductosController.downloadProductsExcel);
// Define una ruta HTTP GET para descargar productos en formato Excel.
// Cuando se hace una solicitud GET a '/excel', se ejecuta el método 'downloadProductsExcel' del controlador.
router.delete('/productos/:id', ProductosController.deleteProductos);


module.exports = router;
// Exporta el enrutador para que pueda ser utilizado en la aplicación principal.
