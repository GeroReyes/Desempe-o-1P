const pool = require('../config/db.js');

class SaleDetail {
    static async create(saleId, product_name, quantity, price) {
        const result = await pool.query('INSERT INTO sale_details (sale_id, product_name, quantity, price) VALUES ($1, $2, $3,$4) RETURNING *', [saleId, product_name, quantity, price]);
        return result.rows[0];
    }
}

module.exports = SaleDetail;