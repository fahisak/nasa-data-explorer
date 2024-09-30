// test/neoController.test.js

const request = require('supertest');
const express = require('express');
const { neoController} = require('../src/controllers/neoController'); // Adjust the path as necessary
const axios = require('axios');
const logger = require('../src/helper/logger');

// Create an instance of the Express app
const app = express();

// Define the route for testing
app.get('/api/nasa/neo-ws', neoController.getAsteroidData);

// Mocking Axios
jest.mock('axios');
jest.mock('../src/helper/logger.js'); // Mock logger

describe('NEO Controller', () => {
    
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should fetch asteroid data by asteroid ID successfully', async () => {
        // Mocking a successful API response for a specific asteroid
        const mockAsteroidResponse = {
            id: '2000433',
            name: 'Asteroid Test',
            estimated_diameter: {
                kilometers: {
                    estimated_diameter_min: 1,
                    estimated_diameter_max: 2,
                }
            },
            close_approach_data: [],
        };

        axios.get.mockResolvedValueOnce({ data: mockAsteroidResponse });

        const response = await request(app).get('/api/nasa/asteroids?asteroid_id=12345');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockAsteroidResponse); // Check if the response body matches the mocked response
    });

    it('should return 404 if asteroid is not found', async () => {
        // Mocking a 404 response for an asteroid not found
        axios.get.mockResolvedValueOnce({ status: 404, statusText: 'Not Found' });

        const response = await request(app).get('/api/nasa/asteroids?asteroid_id=99999');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Not Found'); // Check if the message is correct
    });

    it('should fetch asteroid data within a date range successfully', async () => {
        // Mocking a successful response for NEO data within date range
        const mockFeedResponse = {
            element_count: 2,
            near_earth_objects: {
                '2024-09-28': [
                    {
                        id: '12345',
                        name: 'Asteroid Test 1',
                    },
                    {
                        id: '67890',
                        name: 'Asteroid Test 2',
                    },
                ],
            },
        };

        axios.get.mockResolvedValueOnce({ data: mockFeedResponse });

        const response = await request(app).get('/api/nasa/asteroids?start_date=2024-09-27&end_date=2024-09-29');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockFeedResponse); // Check if the response body matches the mocked response
    });

    it('should fetch all asteroids successfully', async () => {
        // Mocking a successful response for browsing asteroids
        const mockBrowseResponse = {
            element_count: 5,
            near_earth_objects: [],
        };

        axios.get.mockResolvedValueOnce({ data: mockBrowseResponse });

        const response = await request(app).get('/api/nasa/asteroids');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockBrowseResponse); // Check if the response body matches the mocked response
    });

    it('should return 500 if an error occurs while fetching data', async () => {
        // Mocking an error response
        axios.get.mockRejectedValueOnce(new Error('Network Error'));

        const response = await request(app).get('/api/nasa/asteroids');

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Request failed: Network Error');
        expect(logger.info).toHaveBeenCalledWith('error:', expect.any(String)); // Check if logger was called
    });
});
