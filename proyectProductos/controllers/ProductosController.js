const Productos = require('../models/ProductosModel');
const { response } = require('express'); 
const ExcelJS = require('exceljs'); 

class ProductosController {

    // Método para obtener todos los productos
    static async getAllProductos(req, res) {
        try {
            const productos = await Productos.findAll(); 
            res.json(productos); 
        } catch (error) {
            res.status(500).json({ error: error.message }); 
        }
    }

    // Método para crear un nuevo producto
    static async createProductos(req, res) {
        try {
            const producto = await Productos.create(req.body); 
            res.status(201).json(producto); 
        } catch (error) {
            res.status(500).json({ error: error.message }); 
        }
    }

    // Método para obtener un producto por su ID
    static async getProductosById(req, res) {
        try {
            const producto = await Productos.findById(req.params.id); 
            if (!producto) {
                return res.status(404).json({ message: "Producto no encontrado" }); // Si no se encuentra el producto, devuelve un código 404
            }
            return res.json(producto); // Devuelve el producto en formato JSON
        } catch (error) {
            res.status(500).json({ error: error.message }); // En caso de error, devuelve un código 500 y un mensaje de error
        }
    }

    // Método para actualizar un producto por su ID
    static async updateProductos(req, res) {
        try {
            const producto = await Productos.update(req.params.id, req.body); // Actualiza un producto con el ID proporcionado y los datos en el cuerpo de la solicitud
            if (!producto) {
                return res.status(404).json({ message: "Producto no encontrado" }); // Si no se encuentra el producto, devuelve un código 404
            }
            return res.json(producto); // Devuelve el producto actualizado
        } catch (error) {
            res.status(500).json({ error: error.message }); // En caso de error, devuelve un código 500 y un mensaje de error
        }
    }

    // Método para eliminar un producto por su ID
    static async deleteProductos(req, res) {
        try {
            const producto = await Productos.delete(req.params.id); // Elimina un producto por su ID (borrado lógico)
            if (!producto) {
                return res.status(404).json({ message: "Producto no encontrado" }); // Si no se encuentra el producto, devuelve un código 404
            }
            return res.json({ message: "Producto eliminado" }); // Devuelve un mensaje confirmando que el producto fue eliminado
        } catch (error) {
            res.status(500).json({ error: error.message }); // En caso de error, devuelve un código 500 y un mensaje de error
        }
    }

    // Método para buscar productos en todas las columnas de la base de datos
    static async searchAllColumns(req, res) {
        try {
            const searchString =  await Productos.searchAllColumns(req.params.id); // Toma la cadena de búsqueda de los parámetros de consulta (query string)
            if (!searchString) {
                return res.status(400).json({ error: "Se requiere el parámetro de búsqueda 'q'" }); // Si no se proporciona un término de búsqueda, devuelve un error 400
            }
            const productos = await Productos.searchAllColumns(searchString); // Busca productos en todas las columnas de la base de datos utilizando la cadena de búsqueda
            return res.json(productos); // Devuelve los productos encontrados
        } catch (error) {
            res.status(500).json({ error: error.message }); // En caso de error, devuelve un código 500 y un mensaje de error
        }
    }

    // Método para generar y descargar un archivo Excel con todos los productos
    static async downloadProductsExcel(req, res) {
        try {
            const products = await Productos.findAll(); // Obtiene todos los productos de la base de datos

            // Genera un archivo y una hoja de cálculo
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Productos');

            // Define las columnas del Excel
            worksheet.columns = [
                { header: 'Nombre', key: 'producto', width: 30 },
                { header: 'Precio', key: 'precio', width: 15 },
                { header: 'Stock Min', key: 'stock_minimo', width: 15 },
                { header: 'Stock Max', key: 'stock_maximo', width: 15 },
                { header: 'Existencia', key: 'existencias', width: 15 },
                { header: 'SKU', key: 'sku', width: 15 },
            ];

            // Agrega los productos a las filas
            products.forEach(product => {
                worksheet.addRow(product);
            });

            // Configura las cabeceras para descargar como un archivo .xlsx
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=productos.xlsx');

            // Enviar el archivo Excel
            await workbook.xlsx.write(res);
            res.end();
        } catch (error) {
            console.error('Error generando archivo Excel:', error);
            res.status(500).send('Error generando archivo Excel'); // En caso de error, devuelve un código 500
        }
    }
}

module.exports = ProductosController; // Exporta la clase ProductosController para que pueda ser utilizada en otras partes de la aplicación
