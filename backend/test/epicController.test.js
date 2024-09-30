// test/epicController.test.js

const request = require('supertest');
const express = require('express');
const { epicController } = require('../src/controllers/epicController'); // Adjust the path as necessary
const axios = require('axios');

// Create an instance of the Express app
const app = express();

// Define the route for testing
app.get('/api/nasa/epic', epicController.getEpicData);

// Mocking Axios
jest.mock('axios');

describe('EPIC Controller', () => {
    it('should fetch EPIC data successfully when no date is provided', async () => {
        // Mocking a successful API response
        axios.get.mockResolvedValueOnce({
            data: [{ date: '2024-01-01', image: 'http://example.com/epic.jpg' }], // Example EPIC data
        });

        const response = await request(app).get('/api/nasa/epic');
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1); // Check if we received one EPIC image
        expect(response.body[0]).toHaveProperty('date', '2024-01-01'); // Check if the EPIC image has a date
    });

    it('should fetch EPIC data for a specific date successfully', async () => {
        // Mocking a successful API response for a specific date
        const date = '2024-01-01';
        axios.get.mockResolvedValueOnce({
            data: [{ date, image: 'http://example.com/epic.jpg' }], // Example EPIC data for the specific date
        });

        const response = await request(app).get(`/api/nasa/epic?date=${date}`);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1); // Check if we received one EPIC image for the date
        expect(response.body[0]).toHaveProperty('date', date); // Check if the EPIC image has the correct date
    });

    it('should return 500 when API fetch fails', async () => {
        // Mocking a failed API response
        axios.get.mockRejectedValueOnce(new Error('Network Error'));

        const response = await request(app).get('/api/nasa/epic?date=2024-01-01');

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Failed to fetch EPIC data');
        expect(response.body.error).toBe('Network Error'); // Check if the error message is included
    });
});
