const pool = require('../config/db'); // Importa el objeto `pool` desde el archivo de configuración de la base de datos para manejar las consultas a la base de datos.

class Productos { // Define la clase `Productos`, que representa el modelo de productos en la base de datos.
    
    // Método estático para obtener todos los registros de la tabla 'productos'.
    static async findAll() {
        const result = await pool.query('SELECT * FROM productos'); // Ejecuta una consulta SQL para obtener todos los productos de la tabla.
        return result.rows; // Devuelve las filas obtenidas de la consulta.
    }

    // Método estático para crear un nuevo producto.
    static async create(data) {
        const { producto, precio, stock_minimo, stock_maximo, existencias, SKU } = data; // Desestructura los datos necesarios para crear un producto.
        const result = await pool.query(
            'INSERT INTO productos(producto, precio, stock_minimo, stock_maximo, existencias, SKU) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', 
            [producto, precio, stock_minimo, stock_maximo, existencias, SKU] // Inserta los valores correspondientes en la base de datos usando placeholders ($1, $2, ...).
        );
        return result.rows[0]; // Devuelve la primera fila, que representa el nuevo producto creado.
    }

    // Método estático para buscar un producto por su ID.
    static async findById(id) {
        const result = await pool.query('SELECT * FROM productos WHERE id = $1', [id]); // Ejecuta una consulta SQL para buscar un producto con un ID específico.
        return result.rows[0]; // Devuelve el producto encontrado o `undefined` si no se encuentra.
    }

    // Método estático para actualizar un producto existente en la base de datos.
    static async update(id, data) {
        const { producto, precio, stock_minimo, stock_maximo, existencias, SKU } = data; // Desestructura los datos del producto a actualizar.
        const result = await pool.query(
            'UPDATE productos SET producto = $1, precio = $2, stock_minimo = $3, stock_maximo = $4, existencias = $5, SKU = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
            [producto, precio, stock_minimo, stock_maximo, existencias, SKU, id] // Actualiza los campos del producto con los valores proporcionados, y actualiza la columna `updated_at`.
        );
        return result.rows[0]; // Devuelve el producto actualizado.
    }

    // Método estático para eliminar un producto (borrado lógico) actualizando el campo 'deleted_at'.
    static async delete(id) {
        const result = await pool.query('UPDATE productos SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *', [id]); // Marca el producto como eliminado estableciendo la fecha de eliminación en `deleted_at`.
        return result.rows[0]; // Devuelve el producto que ha sido "eliminado".
    }

    // Método estático para buscar en todas las columnas de la tabla 'productos' según una cadena de búsqueda.
    static async searchAllColumns(id) {
        const result = await pool.query(`SELECT * FROM productos 
            WHERE producto LIKE $1 
            OR precio::text LIKE $1 
            OR stock_minimo::text LIKE $1 
            OR stock_maximo::text LIKE $1 
            OR existencias::text LIKE $1 
            OR SKU LIKE $1`, 
            [`%${id}%`] // Realiza una búsqueda flexible (ILIKE) en todas las columnas especificadas usando la cadena de búsqueda proporcionada.
        );
        return result.rows; // Devuelve los productos que coinciden con la búsqueda.
    }

    // Método estático para obtener todos los productos en formato adecuado para exportar a Excel.
    static async getAllProductsExcel() {
        const query = `
            SELECT producto, precio, stock_minimo, stock_maximo, existencias, sku
            FROM productos;
        `; // Define una consulta para obtener solo las columnas que son relevantes para la exportación a Excel.
        const result = await pool.query(query); // Ejecuta la consulta.
        return result.rows; // Devuelve los productos obtenidos en un formato simplificado para la exportación.
    }
}

module.exports = Productos; // Exporta la clase `Productos` para que pueda ser usada en otras partes de la aplicación.
