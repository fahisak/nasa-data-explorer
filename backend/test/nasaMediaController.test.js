// test/nasaMediaController.test.js

const request = require('supertest');
const express = require('express');
const { nasaMediaController } = require('../src/controllers/nasaMediaController'); // Adjust the path as necessary
const axios = require('axios');

// Create an instance of the Express app
const app = express();

// Define the route for testing
app.get('/api/nasa/nasa-media', nasaMediaController.getNasaMedia);

// Mocking Axios
jest.mock('axios');

describe('NASA Media Controller', () => {
    
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should fetch NASA media data for search type', async () => {
        // Mocking a successful API response for search
        const mockResponse = {
            collection: {
                items: [{ /* Example item */ }]
            }
        };

        axios.get.mockResolvedValueOnce({ data: mockResponse });

        const response = await request(app).get('/api/nasa/media?type=search&q=moon');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResponse); // Check if the response body matches the mocked response
    });

    it('should return 400 if nasa_id is missing for asset type', async () => {
        const response = await request(app).get('/api/nasa/media?type=asset');

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("nasa_id is required for asset retrieval");
    });

    it('should fetch NASA asset data successfully', async () => {
        const mockAssetResponse = {
            data: {
                /* Example asset data */
            }
        };

        axios.get.mockResolvedValueOnce({ data: mockAssetResponse });

        const response = await request(app).get('/api/nasa/media?type=asset&nasa_id=123');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockAssetResponse); // Check if the response body matches the mocked response
    });

    it('should return 400 if invalid type is provided', async () => {
        const response = await request(app).get('/api/nasa/media?type=invalid');

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Invalid type parameter. Must be one of: search, asset, metadata, captions");
    });

    it('should return 500 if an error occurs while fetching data', async () => {
        axios.get.mockRejectedValueOnce(new Error('Network Error'));

        const response = await request(app).get('/api/nasa/media?type=search&q=moon');

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('An error occurred');
    });

    it('should return combined results when fetching asset, metadata, and captions', async () => {
        const mockSearchResponse = {
            collection: {
                items: [{ /* Example search item */ }]
            }
        };

        const mockAssetResponse = { data: { /* Example asset data */ }};
        const mockMetadataResponse = { data: { /* Example metadata data */ }};
        const mockCaptionsResponse = { data: { /* Example captions data */ }};

        // Mock responses for the three endpoints
        axios.get.mockResolvedValueOnce({ data: mockSearchResponse }) // For search
            .mockResolvedValueOnce({ data: mockAssetResponse }) // For asset
            .mockResolvedValueOnce({ data: mockMetadataResponse }) // For metadata
            .mockResolvedValueOnce({ data: mockCaptionsResponse }); // For captions

        const response = await request(app).get('/api/nasa/media?nasa_id=123&q=moon');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            asset: mockAssetResponse,
            metadata: mockMetadataResponse,
            captions: mockCaptionsResponse,
            collections: mockSearchResponse,
        });
    });
});
