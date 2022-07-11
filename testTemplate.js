// Pull all the required functions from node_modules.
const globals = require("../global/globals.js");
// These will stay up here, and don't need to be moved to inside any of the Mocha stuff.
const {By, Key, Builder, WebElementCondition, WebDriver, until, WebElement, ExpectedConditions} = require("selenium-webdriver");
require("chromedriver");
var assert = require("assert")

// These are the enums to help keep things organized when specifying values.
const Constants = require("../Enums/Constants.js");
const { addConsoleHandler } = require("selenium-webdriver/lib/logging.js");

describe('sort order verification', function()
{
    let driver
    let pw
    let url

    before(async function()
    {   
        // This handles getting the needed variables for the environment specified in 
        let envVars = await globals.GetEnvironmentVariables();

        // Set variables here, most likely user/environment.
        url = envVars[0];
        pw = envVars[1];
    })

    beforeEach(async function()
    {
        driver = await globals.CreateDriver();
    })

    afterEach(async function()
    {
        await driver.quit();
    })

    after(async function()
    {

    })

    // This is the actual test function.
    it('RENAME THIS METHOD TO WHAT YOU ARE TESTING', async function()
    {        
        // Reference the POMs that are needed in the test
        const SignIn = require("../POMs/SignIn.js");
        const Dashboard = require("../POMs/Dashboard.js");

        // Create the POMs that are being used in the test.
        let signIn = new SignIn(driver);
        let dashboard = new Dashboard(driver);

        // Set the user that will be used in the test.
        var username = "mayur_sa";

        // Sign in to the platform and wait for redirection to the dashboard.
        await signIn.load(url);
        await signIn.login(username, pw);
    
        // Wait for the dashboard page to load.
        await dashboard.waitForLoading();

        // Add comments below for each step you need to perform the test.
    })
})