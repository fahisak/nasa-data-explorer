const axios = require('axios');
const apiConstants = require('../constants/apiConstants');

const NASA_API_KEY = apiConstants.NASA_API_KEY;



/**
 * Controller function to fetch Astronomy Picture of the Day (APOD) data from NASA's API.
 * 
 * This function handles incoming requests to retrieve APOD data based on optional query parameters:
 * - date: Specific date to get the APOD for (format: YYYY-MM-DD).
 * - start_date: Start date for fetching multiple APODs (format: YYYY-MM-DD).
 * - end_date: End date for fetching multiple APODs (format: YYYY-MM-DD).
 * - count: Number of APODs to return.
 * 
 * @param {Object} req - The request object, containing query parameters.
 * @param {Object} res - The response object, used to send data back to the client.
 * 
 * @returns {Promise<void>} Sends the fetched APOD data as JSON or an error message if the fetch fails.
 * 
 * @throws {Error} Returns appropriate error messages for different failure scenarios, 
 * such as network errors or API errors.
 * 
 * Author: Fahisa
 */

const getApod = async (req, res) => {
    const { date, start_date, end_date, count } = req.query; 
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}${date ? `&date=${date}` : ''}${start_date ? `&start_date=${start_date}` : ''}${end_date ? `&end_date=${end_date}` : ''}${count ? `&count=${count}` : ''}`;

    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            res.json(response.data);
        } else {
            res.status(response.status).json({ message: 'Failed to fetch APOD data' });
        }
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({
                message: error.response.data.msg || 'Failed to fetch APOD data',
            });
        } else {
            res.status(500).json({ message: 'Failed to fetch APOD data due to network error' });
        }
    }
};

module.exports = {
    apodController: {
        getApod,
    },
};
