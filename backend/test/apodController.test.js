const request = require('supertest');
const express = require('express');
const { apodController } = require('../src/controllers/apodController');
const app = express();

app.get('/api/nasa/apod', apodController.getApod);

// Mocking Axios
jest.mock('axios');
const axios = require('axios');

describe('APOD Controller', () => {
    it('should fetch Astronomy Picture of the Day data', async () => {
        // Mocking successful response from the API
        axios.get.mockResolvedValueOnce({
            status: 200,
            data: { title: 'Sample APOD Title' }, // Example response
        });

        const response = await request(app).get('/api/nasa/apod?date=2024-01-01');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title');
    });

    it('should return 500 on API failure', async () => {
        // Mocking a failure response
        axios.get.mockRejectedValueOnce(new Error('Network Error'));

        const response = await request(app).get('/api/nasa/apod?date=invalid-date');
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Failed to fetch APOD data due to network error');
    });
});
