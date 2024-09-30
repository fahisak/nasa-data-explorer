const axios = require('axios');
const logger=require('../helper/logger')
/**
 * Controller function to fetch Astronomy Picture of the Day (APOD) data from NASA's API.
 * 
 * This function handles incoming requests to retrieve the APOD, which includes an image or video 
 * along with a description for the current day.
 * 
 * @param {Object} req - The request object, representing the HTTP request.
 * @param {Object} res - The response object, used to send data back to the client.
 * 
 * @returns {Promise<void>} Sends the fetched APOD data as JSON or an error message if the fetch fails.
 * 
 * @throws {Error} Returns a 500 status code with an appropriate error message if the fetch fails.
 * 
 * Author: Fahisa
 */
const getApodData = async (req, res) => {
  try {
    const apiKey = process.env.NASA_API_KEY;
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
    res.status(200).json(response.data);
  } catch (error) {
    logger.info('Error fetching APOD data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

module.exports = { getApodData };
