 const express = require('express');
 const SaleController = require('../controllers/saleController');
    const router = express.Router();
    router.post('/sales', SaleController.createSale);

    module.exports = router;