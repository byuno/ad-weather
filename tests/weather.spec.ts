import { expect, test } from '@playwright/test';

test('Verify 200 status code, body contains weather data', async ({page, request}) => {
    const response = await request.get('https://api.openweathermap.org/data/2.5/weather?q=Kawagoe&a');
    expect(response.ok()).toBeTruthy();
    
    const responseBody = response.body();
    console.log(responseBody);
})