// test/marsPhotosController.test.js

const request = require('supertest');
const express = require('express');
const { marsPhotosController } = require('../src/controllers/marsPhotosController');
const axios = require('axios');

const app = express();

app.get('/api/nasa/mars-photos', marsPhotosController.getMarsPhotos);

// Mocking Axios
jest.mock('axios');

describe('Mars Photos Controller', () => {
    it('should fetch Mars rover photos successfully', async () => {
        // Mocking a successful API response
        axios.get.mockResolvedValueOnce({
            data: { photos: [{ id: 1, img_src: 'http://example.com/photo.jpg' }] }, // Example photo data
        });

        const response = await request(app).get('/api/nasa/mars-photos?sol=1000');
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('photos');
        expect(response.body.photos).toHaveLength(1); // Check if we received one photo
        expect(response.body.photos[0]).toHaveProperty('id', 1); // Check if the photo has an id
    });

    it('should return 500 when API fetch fails', async () => {
        // Mocking a failed API response
        axios.get.mockRejectedValueOnce(new Error('Network Error'));

        const response = await request(app).get('/api/nasa/mars-photos?sol=1000');

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Failed to fetch Mars photos data');
    });
});
