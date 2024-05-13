import { expect, test } from '@playwright/test';
import 'dotenv/config'

test('Verify 200 status code, body contains weather data', async ({page, request}) => {
    const response = await request.get(`https://api.openweathermap.org/data/2.5/weather?q=Kawagoe&appid=${process.env.APPID}`);
    expect(response.ok()).toBeTruthy();
    
    const responseBody = await response.json();
    console.log(responseBody);
})


// test("retrieves weather data", async ({ request }) => {
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY";
//     const response = await request.get(url);

//     // Check status code
//     expect(response.status()).toBe(200);

//     // Check content type (optional)
//     expect(response.headers()["content-type"]).toContain("application/json");

//     // Parse the response body as JSON
//     const weatherData = await response.json();

//     // Example assertions (customize based on your needs)
//     expect(weatherData.main.temp).toBeDefined(); // Temperature
//     expect(weatherData.wind.speed).toBeDefined(); // Wind speed
//     // Add more assertions as needed
// });
