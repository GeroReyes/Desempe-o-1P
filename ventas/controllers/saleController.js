const Sale = require("../models/saleModel");
const SaleDetail = require("../models/saleDetailModel");

class SaleController {
  static async createSale(req, res) {
    const { total, details } = req.body;
    try {
      const sale = await Sale.create(req.body.total);
      for (let detail of details) {
        await SaleDetail.create(
          sale.id,
          detail.product_name,
          detail.quantity,
          detail.price
        );
      }
      res.status(201).json({ sale, details });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = SaleController;
