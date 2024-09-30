const axios = require('axios');
require('dotenv').config();
const logger=require('../helper/logger')
const NASA_API_KEY = process.env.NASA_API_KEY;
/**
 * Controller function to fetch asteroid data from NASA's Near Earth Object (NEO) API.
 * 
 * This function handles incoming requests to retrieve data about asteroids. It supports the following
 * query parameters:
 * - start_date: The start date for retrieving NEOs (format: YYYY-MM-DD).
 * - end_date: The end date for retrieving NEOs (format: YYYY-MM-DD).
 * - asteroid_id: The unique identifier for a specific asteroid.
 * 
 * The function handles three types of requests:
 * 1. If `asteroid_id` is provided, it retrieves data for that specific asteroid.
 * 2. If both `start_date` and `end_date` are provided, it retrieves NEO data within that date range.
 * 3. If neither is provided, it retrieves a browse list of all asteroids.
 * 
 * @param {Object} req - The request object, containing query parameters.
 * @param {Object} res - The response object, used to send data back to the client.
 * 
 * @returns {Promise<void>} Sends the requested asteroid data as JSON or an error message if the fetch fails.
 * 
 * @throws {Error} 
 * Returns a 404 status code for not found errors when fetching specific asteroids.
 * Returns a 500 status code for server errors, including network issues or API errors.
 * 
 * Author: Fahisa
 */
const getAsteroidData = async (req, res) => {
    const { start_date, end_date, asteroid_id } = req.query; 
    try {
        if (asteroid_id) {
            const url = `https://api.nasa.gov/neo/rest/v1/neo/${asteroid_id}?api_key=${NASA_API_KEY}`;
            const response = await axios.get(url);
          
            if (response?.data) {
                return res.json(response.data);
            } else if (response.statusText === 'Not Found') {
                return res.status(404).json({ message: response.statusText });
            } else {
                return res.status(500).json({ message: 'No data found', statusText: response.statusText });
            }
           
        }

        if (start_date && end_date) {
            const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${NASA_API_KEY}`;
            const response = await axios.get(url);
            return res.json(response.data);
        }
        const url = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${NASA_API_KEY}`;
        const response = await axios.get(url);
        return res.json(response.data);

    } catch (error) {
        if (error.response) {
           logger.info('API response error:', error.response.statusText);
            return res.status(error.response.status).json({ message: error.response.statusText });
        } else if (error.request) {
           logger.info('No response received:', error.request);
            return res.status(500).json({ message: 'No response from the server. Please try again later.' });
        } else {
           logger.info('error:', error.message);
            return res.status(500).json({ message: `Request failed: ${error.message}` });
        }
    }
};

module.exports = {
    neoController: {
        getAsteroidData
    },
};
