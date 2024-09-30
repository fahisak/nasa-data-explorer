const axios = require('axios');
require('dotenv').config();

const NASA_API_KEY = process.env.NASA_API_KEY;
const logger=require('../helper/logger')

/**
 * Controller function to fetch Mars rover photos from NASA's Mars Photos API.
 * 
 * This function handles incoming requests to retrieve photos taken by the Curiosity rover.
 * It supports the following optional query parameters:
 * - sol: The Martian sol (day) for which to retrieve photos.
 * - earth_date: The Earth date for which to retrieve photos (format: YYYY-MM-DD).
 * - camera: The specific camera used to take the photos (e.g., 'FHAZ', 'RHAZ', etc.).
 * - page: The page number for paginated results.
 * 
 * @param {Object} req - The request object, containing query parameters.
 * @param {Object} res - The response object, used to send data back to the client.
 * 
 * @returns {Promise<void>} Sends the fetched Mars rover photos as JSON or an error message if the fetch fails.
 * 
 * @throws {Error} Returns a 500 status code with an appropriate error message if the fetch fails.
 * 
 * Author: Fahisa
 */
const getMarsPhotos = async (req, res) => {
    let { sol, camera, earth_date, page } = req.query;
  
    try {
      let params = { api_key: NASA_API_KEY };
      if (sol) {
        params.sol = sol;
      }
      if (earth_date) {
        params.earth_date = earth_date;
      }
      if (camera) {
        params.camera = camera;
      }
      if (page) {
        params.page = page;
      }
      const response = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos`,
        { params }
      );
    
      res.json(response.data);
    } catch (error) {
       logger.info(error)
      res.status(500).json({ message: 'Failed to fetch Mars photos data' });
    }
  };


module.exports = {
    marsPhotosController: {
        getMarsPhotos
    }
};
