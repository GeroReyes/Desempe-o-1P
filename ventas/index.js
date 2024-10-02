const express = require('express');
const saleRoutes = require('./routes/saleRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api', saleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    {
        console.log(`Server is running on port ${PORT}`);
    }
)