const pool = require('../config/db.js');

class Sales {
    static async create(total) {
        const result = await pool.query('INSERT INTO sales (total) VALUES ($1) RETURNING *', [total]);
        return result.rows[0];
}
}

module.exports = Sales;