import { expect, test } from '@playwright/test';
import 'dotenv/config'

test('Verify 200 status code, body contains weather data', async ({page, request}) => {
    //Using Kawagoe as the city query 
    const response = await request.get(`https://api.openweathermap.org/data/2.5/weather?q=Kawagoe&appid=${process.env.APPID}`);
    expect(response.ok()).toBeTruthy();
    
    const responseBody = await response.json();
   
    // Checks if the key has data
    function hasData(obj, key) {
    if (obj.hasOwnProperty(key)) {
        // Check if the value associated with the key is not null, undefined, or an empty string
        return obj[key] !== null && obj[key] !== undefined && obj[key] !== '';
        }
        return false; // Key doesn't exist in the object
    }

    //Checks to see if there is data for the city name
    expect(hasData(responseBody, 'name')).toBe(true)
    
    //Checks to see if there is datat temp, pressure, humidity, etc.
    for(let key in responseBody.main){
        expect(hasData(responseBody.main, key)).toBe(true);
    }

    //Checks to see if there is data for the weather conditions. Because of the array, assuming
    //there could be more than one

    let weatherArrLength =responseBody.weather.length
    
    for(let i = 0; i < weatherArrLength; i++){
        for(let key in responseBody.weather[i]){
            expect(hasData(responseBody.weather[i], key)).toBe(true);
        }
    } 

});
test('test2', async ({request}) => {

});

test('test3', async ({request}) => {

});
