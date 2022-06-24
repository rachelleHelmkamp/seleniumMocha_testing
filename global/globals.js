const {By, Key, Builder, WebElementCondition, WebDriver, until, WebElement, ExpectedConditions} = require("selenium-webdriver");
const path = require("path");
const fProcess = require('find-process');
const chrome = require('selenium-webdriver/chrome');
 
 class globals
 {
    static async GetEnvironmentVariables()
    {
        // One option here...
        // we have the current process, which has the parent ID. The parent process should have all of the launch parameters.
        // Get the ID of the parent process.
        // Get the actual parent process.
        // Get the parentProcess.argv.
        // Parse that out to get the environment to use to get the correct .env file to use.
        let variables = {}

        // When running in parallel the process that specifically runs the test will not have the full list of parameters used to launch the suite.
        // Grab the parent process, which does have that information, and get the data from it.
        let parentProcess = await fProcess('pid', process.ppid);
        let pArgs = parentProcess[0].cmd.split(' ');
        let envToLoad = pArgs[pArgs.length-2]

        // Load the values stored in the custom configuration to the process.
        require('dotenv').config({ path: path.resolve(__dirname, envToLoad)});

        // Set variables here, most likely user/environment.
        variables = [process.env.URL, process.env.PASSWORD];

        return variables;
    }

    static async CreateDriver()
    {
        // Create the driver, and Wait for it to build and launch. 
        //driver = await new Builder().forBrowser("chrome").setChromeOptions(new chrome.Options().headless()).build();
        let driver = await new Builder().forBrowser("chrome").build();

        // Maximize the window.
        await driver.manage().window().maximize();

        return driver;
    }

    static 
 } 

module.exports = globals