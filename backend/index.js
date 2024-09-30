const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nasaRoutes = require('./src/routes/nasaroutes'); 
const logger=require('./src/helper/logger')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/api/nasa', nasaRoutes);

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`)
});
