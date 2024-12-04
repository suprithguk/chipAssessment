// Utility function to mock a successful API response
export const mockSuccessfulResponse = (interceptAlias: string) => {
    cy.intercept('GET', '**/data/2.5/weather*', {
        statusCode: 200,
        body: {
            weather: [{ main: 'Clouds', description: 'overcast clouds' }],
            main: { temp: 298.15, humidity: 80 },
            name: 'Mock City',
        },
    }).as(interceptAlias);
};

// Utility function to mock an error response
export const mockErrorResponse = (statusCode: number, message: string, interceptAlias: string) => {
    cy.intercept('GET', '**/data/2.5/weather*', {
        statusCode,
        body: { message },
    }).as(interceptAlias);
};

// Utility function to make an API request
export const makeWeatherApiRequest = (lat: number, lon: number, appid: string) => {
    return cy.request({
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        qs: { lat, lon, appid },
    });
};