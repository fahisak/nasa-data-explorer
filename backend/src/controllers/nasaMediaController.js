const axios = require('axios');
require('dotenv').config();
const logger=require('../helper/logger')
const NASA_API_BASE = 'https://images-api.nasa.gov';


/**
 * Controller function to fetch NASA media data from the NASA Images API.
 * 
 * This function handles incoming requests to retrieve various types of media from NASA's collection.
 * It supports the following query parameters:
 * - type: Specifies the type of request. Can be 'search', 'asset', 'metadata', or 'captions'.
 * - nasa_id: The unique ID for a specific NASA asset.
 * - q: A query string for searching media.
 * - media_type: Type of media to filter (e.g., image, video).
 * - year_start: Starting year for filtering results.
 * - year_end: Ending year for filtering results.
 * - page: The page number for paginated results.
 * - page_size: The number of results per page.
 * 
 * @param {Object} req - The request object, containing query parameters.
 * @param {Object} res - The response object, used to send data back to the client.
 * 
 * @returns {Promise<void>} Sends the requested media data as JSON or an error message if the fetch fails.
 * 
 * @throws {Error} 
 * Returns a 400 status code with an error message for missing required parameters (e.g., `nasa_id`)
 * or for invalid type parameters.
 * Returns a 500 status code for internal server errors or issues with fetching data.
 * 
 * Author: Fahisa
 */
const getNasaMedia = async (req, res) => {
    const { type, nasa_id, q, year_start, year_end ,media_type,page,page_size} = req.query; 

    try {
        let params = {};
        if (q) params.q = q;
        if (media_type) params.media_type = media_type;
        if (year_start) params.year_start = year_start;
        if (year_end) params.year_end = year_end;
        if (page) params.page = page;
        if (page_size) params.page_size = page_size;

        if (type === 'search' ) {
            const response = await axios.get(`${NASA_API_BASE}/search`, { params });
            return res.json(response.data);
        }

        if (nasa_id && !type && q) {
            try {
                const searchResponse = await axios.get(`${NASA_API_BASE}/search`, { params });
                const assetResponse = await axios.get(`${NASA_API_BASE}/asset/${nasa_id}`);
                const metadataResponse = await axios.get(`${NASA_API_BASE}/metadata/${nasa_id}`);
                const captionsResponse = await axios.get(`${NASA_API_BASE}/captions/${nasa_id}`);
        
                const combinedResults = {
                    asset: assetResponse.data,
                    metadata: metadataResponse.data,
                    captions: captionsResponse.data,
                    collections:searchResponse.data
                };

                return res.json(combinedResults);
            } catch (error) {
                return res.status(500).json({ error: 'An error occurred while fetching asset, metadata, or captions', details: error.message });
            }
        }

        if (type === 'asset') {
            if (!nasa_id) {
                return res.status(400).json({ error: "nasa_id is required for asset retrieval" });
            }
            const response = await axios.get(`${NASA_API_BASE}/asset/${nasa_id}`);
            return res.json(response.data);
        }

        if (type === 'metadata') {
            if (!nasa_id) {
                return res.status(400).json({ error: "nasa_id is required for metadata retrieval" });
            }
            const response = await axios.get(`${NASA_API_BASE}/metadata/${nasa_id}`);
            return res.json(response.data);
        }

        if (type === 'captions') {
            if (!nasa_id) {
                return res.status(400).json({ error: "nasa_id is required for captions retrieval" });
            }
            const response = await axios.get(`${NASA_API_BASE}/captions/${nasa_id}`);
            return res.json(response.data);
        }

        else {
            return res.status(400).json({ error: "Invalid type parameter. Must be one of: search, asset, metadata, captions" });
        }

    } catch (error) {
      logger.info("error", error);
        return res.status(500).json({ error: 'An error occurred', details: error.message });
    }
};


module.exports = {
    nasaMediaController: {
        getNasaMedia
    }
};