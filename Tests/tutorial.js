// Pull all the required functions from node_modules
const {By, Key, Builder} = require("selenium-webdriver");
require("chromedriver");

// Create an example function
async function initialTest()
{
    var searchString = "Testing with selenium and javascript";

    // Create the driver, and Wait for it to build and launch. 
    let driver = await new Builder().forBrowser("chrome").build();

    // Navigate to Google.com.
    await driver.get("http://google.com");

    // Send a string to the driver to search by, then hit enter.
    await driver.findElement(By.name("q")).sendKeys(searchString, Key.RETURN);

    // Verify the title of the search page and print it to the screen.
    var title = await driver.getTitle();
    console.log("Webpage title is: ", title);

    // Quit the driver after execution.
    await driver.quit();
}

// Perform the actual call to the function.
initialTest();