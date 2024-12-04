import { mockSuccessfulResponse, mockErrorResponse, makeWeatherApiRequest } from '../support/apiUtils';
describe('Weather API Tests with Utilities', () => {
    const lat = 44.34;
    const lon = 10.99;
    const apiKey = '5ced3e345129c9a95266db91a02eeaea';

    it('should handle a mocked successful response', () => {
        mockSuccessfulResponse('getWeather');

        makeWeatherApiRequest(lat, lon, apiKey).then((response) => {
            // Validate mocked response
            expect(response.status).to.eq(200);
            expect(response.body.name).to.eq('Zocca');
            expect(response.body.weather[0].main).to.eq('Clouds');
        });

        cy.wait('@getWeather', {timeout: 15000}).then((interception) => {
            // Check if interception.response exists before accessing its properties
            if (interception.response) {
                expect(interception.response.statusCode).to.eq(200);
            } else {
                throw new Error('Intercepted response is undefined');
            }
        });
    });

    it('should handle a mocked server error', () => {
        mockErrorResponse(500, 'Internal Server Error', 'getWeatherError');

        makeWeatherApiRequest(lat, lon, apiKey).then((response) => {
            expect(response.status).to.eq(500);
            expect(response.body.message).to.eq('Internal Server Error');
        });

        cy.wait('@getWeatherError').then((interception) => {
            if (interception.response) {
                expect(interception.response.statusCode).to.eq(500);
            } else {
                throw new Error('Intercepted response is undefined');
            }
        });
    });

    it('should handle an invalid API key error', () => {
        mockErrorResponse(401, 'Invalid API key', 'getInvalidApiKey');

        makeWeatherApiRequest(lat, lon, 'invalid_key').then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.message).to.eq('Invalid API key');
        });

        cy.wait('@getInvalidApiKey').then((interception) => {
            if (interception.response) {
                expect(interception.response.statusCode).to.eq(401);
            } else {
                throw new Error('Intercepted response is undefined');
            }
        });
    });
});