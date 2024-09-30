
const axios = require('axios');
require('dotenv').config();

const NASA_API_KEY = process.env.NASA_API_KEY;

/**
 * Controller function to fetch EPIC (Earth Polychromatic Imaging Camera) image data from NASA's API.
 * 
 * This function handles incoming requests to retrieve EPIC images based on an optional query parameter:
 * - date: Specific date to get EPIC images for (format: YYYY-MM-DD).
 * 
 * If no date is provided, it fetches the latest available EPIC images.
 * 
 * @param {Object} req - The request object, containing query parameters.
 * @param {Object} res - The response object, used to send data back to the client.
 * 
 * @returns {Promise<void>} Sends the fetched EPIC image data as JSON or an error message if the fetch fails.
 * 
 * @throws {Error} Returns a 500 status code with an appropriate error message if the fetch fails.
 * 
 * Author: Fahisa
 */

const getEpicData = async (req, res) => {
    const { date } = req.query;
  
    let url = `https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_API_KEY}`;
  
    try {
      if (date) {
        url = `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${NASA_API_KEY}`;
      } 
      
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch EPIC data', error: error.message });
    }
  };

  module.exports = {
    epicController: {
        getEpicData
    }
};
