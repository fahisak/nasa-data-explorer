const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nasaRoutes = require('./src/routes/nasaroutes'); 
const logger = require('./src/helper/logger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from localhost and your Netlify site
app.use(cors({
  origin: ['http://localhost:3000', 'https://nasa-data-explorer.netlify.app'],  // Allow both local and Netlify
}));

app.use(express.json());

app.use('/api/nasa', nasaRoutes);

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on port: ${PORT}`);
});
