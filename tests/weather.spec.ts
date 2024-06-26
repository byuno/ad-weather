import { expect, test } from '@playwright/test';
import 'dotenv/config'

// Checks if the key has data
function hasData(obj, key) {
    if (obj.hasOwnProperty(key)) {
        // Check if the value associated with the key is not null, undefined, or an empty string
        return obj[key] !== null && obj[key] !== undefined && obj[key] !== '';
        }
        return false; // Key doesn't exist in the object
    }

test('Verify 200 status code, body contains weather data', async ({page, request}) => {
    //Using Kawagoe as the city query 
    const response = await request.get(`https://api.openweathermap.org/data/2.5/weather?q=Kawagoe&appid=${process.env.APPID}`);
    //checks the status code
    expect(response.ok()).toBeTruthy();
    
    const responseBody = await response.json();
   
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

test('Verify 200 status code, body contains weather data, use city ID', async ({request}) => {
    //Get weather details using city name (source of truth)
    
    //Get the weather details using a city ID
    const response = await request.get(`https://api.openweathermap.org/data/2.5/weather?id=1859740&appid=${process.env.APPID}`);
    //checks the status code
    expect(response.ok()).toBeTruthy();
    
    const responseBody = await response.json();

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

test('Verify 200 status code, verify a 5 day forecast by using city name', async ({request}) => {
    //const response = await request.get(`https://api.openweathermap.org/data/2.5/weather?q=Kawagoe&appid=${process.env.APPID}`);
    const response = await request.get(`https://api.openweathermap.org/data/2.5/forecast?q=kawagoe&appid=${process.env.APPID}`);
    //checks the status code
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    //go through the list of weather data
    for(let i = 0; i < responseBody.list.length; i++){
        //expect(hasData(responseBody.list[i].main, 'name')).toBe(true)

        //Check to see if the temp datat (it's in the main object)
        for(let key in responseBody.list[i].main){
            expect(hasData(responseBody.list[i].main, key)).toBe(true);
        }

        //go through the weather (an array of objects)
        for(let j = 0; j < responseBody.list[i].weather.length; j++){
            //check the weather data is present
            for(let key in responseBody.list[i].weather[j]){
                expect(hasData(responseBody.list[i].weather[j], key)).toBe(true);
            }
        }

        //Checks to see if wind data is present
        for(let key in responseBody.list[i].wind){
            expect(hasData(responseBody.list[i].wind, key)).toBe(true);
        }
    }

});
