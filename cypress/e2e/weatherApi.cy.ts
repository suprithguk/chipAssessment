describe('OpenWeatherMap API Positive and Negative Tests', () => {
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const apiKey = '5ced3e345129c9a95266db91a02eeaea';
    const validLat = 44.34;
    const validLon = 10.99;

    it('should return 200 status and valid response structure for a valid request', () => {
        cy.request({
            method: 'GET',
            url: baseUrl,
            qs: {
                lat: validLat,
                lon: validLon,
                appid: apiKey,
            },
        }).then((response) => {
            // Validate HTTP status
            expect(response.status).to.eq(200);

            // Validate response structure
            expect(response.body).to.have.property('weather');
            expect(response.body.weather).to.be.an('array');

            expect(response.body).to.have.property('main');
            expect(response.body.main).to.have.property('temp');
            expect(response.body.main).to.have.property('humidity');

            expect(response.body).to.have.property('name');
        });
    });

    it('should return correct city name for given coordinates', () => {
        cy.request({
            method: 'GET',
            url: baseUrl,
            qs: {
                lat: validLat,
                lon: validLon,
                appid: apiKey,
            },
        }).then((response) => {
            // Validate city name
            expect(response.body.name).to.eq('Zocca');
        });
    });

    it('should include weather details like description and main type', () => {
        cy.request({
            method: 'GET',
            url: baseUrl,
            qs: {
                lat: validLat,
                lon: validLon,
                appid: apiKey,
            },
        }).then((response) => {
            // Validate weather description
            expect(response.body.weather[0]).to.have.property('description');
            expect(response.body.weather[0].description).to.be.a('string');

            // Validate weather main type
            expect(response.body.weather[0]).to.have.property('main');
            expect(response.body.weather[0].main).to.be.a('string');
        });
    });

    it('should return temperature in Kelvin by default', () => {
        cy.request({
            method: 'GET',
            url: baseUrl,
            qs: {
                lat: validLat,
                lon: validLon,
                appid: apiKey,
            },
        }).then((response) => {
            // Validate temperature in Kelvin (default)
            expect(response.body.main.temp).to.be.a('number');
        });
    });

    it('should allow temperature unit conversion to Celsius', () => {
        cy.request({
            method: 'GET',
            url: baseUrl,
            qs: {
                lat: validLat,
                lon: validLon,
                appid: apiKey,
                units: 'metric', // Request temperature in Celsius
            },
        }).then((response) => {
            // Validate temperature in Celsius
            expect(response.body.main.temp).to.be.a('number');
        });
    });

    it('should allow temperature unit conversion to Fahrenheit', () => {
        cy.request({
            method: 'GET',
            url: baseUrl,
            qs: {
                lat: validLat,
                lon: validLon,
                appid: apiKey,
                units: 'imperial', // Request temperature in Fahrenheit
            },
        }).then((response) => {
            // Validate temperature in Fahrenheit
            expect(response.body.main.temp).to.be.a('number');
        });
    });
    it('should return 401 error when API key is missing', () => {
        cy.request({
            method: 'GET',
            url: baseUrl,
            qs: {
                lat: validLat,
                lon: validLon,
            },
            failOnStatusCode: false, // Prevent Cypress from failing the test on HTTP errors
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.message).to.eq('Invalid API key. Please see https://openweathermap.org/faq#error401 for more info.');
        });
    });

    it('should return 401 error for an invalid API key', () => {
        cy.request({
            method: 'GET',
            url: baseUrl,
            qs: {
                lat: validLat,
                lon: validLon,
                appid: 'invalid_api_key',
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.message).to.eq('Invalid API key. Please see https://openweathermap.org/faq#error401 for more info.');
        });
    });

    it('should return 400 error for invalid latitude and longitude values', () => {
        cy.request({
            method: 'GET',
            url: baseUrl,
            qs: {
                lat: 9999, // Invalid latitude
                lon: 9999, // Invalid longitude
                appid: '5ced3e345129c9a95266db91a02eeaea',
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.include('wrong latitude');
        });
    });

    it('should return 400 error when latitude is missing', () => {
        cy.request({
            method: 'GET',
            url: baseUrl,
            qs: {
                lon: validLon,
                appid: '5ced3e345129c9a95266db91a02eeaea',
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.include('Nothing to geocode');
        });
    });

    it('should return 400 error when longitude is missing', () => {
        cy.request({
            method: 'GET',
            url: baseUrl,
            qs: {
                lat: validLat,
                appid: '5ced3e345129c9a95266db91a02eeaea',
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.include('Nothing to geocode');
        });
    });

    it('should return 400 error for non-numeric latitude and longitude', () => {
        cy.request({
            method: 'GET',
            url: baseUrl,
            qs: {
                lat: 'invalid_lat',
                lon: 'invalid_lon',
                appid: '5ced3e345129c9a95266db91a02eeaea',
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.include('wrong latitude');
        });
    });

    it('should handle unsupported query parameters gracefully', () => {
        cy.request({
            method: 'GET',
            url: baseUrl,
            qs: {
                lat: validLat,
                lon: validLon,
                appid: '5ced3e345129c9a95266db91a02eeaea',
                unsupported_param: 'value',
            },
        }).then((response) => {
            expect(response.status).to.eq(200); // API should ignore unsupported parameters
            expect(response.body).to.have.property('weather');
        });
    });

    it('should return appropriate error when exceeding rate limits', () => {
        const requests = [];
        const maxRequests = 65; // Assuming rate limit is 60 requests per minute.

        for (let i = 0; i < maxRequests; i++) {
            requests.push(
                cy.request({
                    method: 'GET',
                    url: baseUrl,
                    qs: {
                        lat: validLat,
                        lon: validLon,
                        appid: '5ced3e345129c9a95266db91a02eeaea',
                    },
                    failOnStatusCode: false,
                })
            );
        }

        Promise.all(requests).then((responses) => {
            const errorResponse = responses.find((res) => res === 429);
            if (errorResponse) {
                expect(errorResponse).to.include('You have exceeded the rate limit');
            }
        });
    });
});