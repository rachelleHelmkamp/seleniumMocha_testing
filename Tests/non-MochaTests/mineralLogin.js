// Pull all the required functions from node_modules
const {By, Key, Builder, WebElementCondition, WebDriver, until, WebElement, ExpectedConditions} = require("selenium-webdriver");
require("chromedriver");

// POMs used by the test.
const Dashboard = require("../POMs/Dashboard.js");
const SignIn = require("../POMs/SignIn.js");
const ContactExperts = require("../POMs/ContactExperts.js");

// These are the enums to help keep things organized when specifying values.
const Constants = require("../Enums/Constants.js");

// Create an example function
async function initialTest(environment)
{
    // Create the driver, and Wait for it to build and launch. 
    let driver = await new Builder().forBrowser("chrome").build();

    // Create the POMs that are being used in the test.
    let dashboard = new Dashboard(driver);
    let signIn = new SignIn(driver);
    let ce = new ContactExperts(driver);

    // Wrap the code in a try/catch block so if an error is encountered it can be caught and reported on in the end.
    try
    {
        var username = "mayur_sa";
        var qaPW = "Pepcusqa@23";

        var mineralURL = "https://apps.qa01.trustmineral-staging.com/auth/login";

        if (environment == "Alpha")
        {
            username = "mayur_ta";
            mineralURL = "https://apps.alpha01.trustmineral-staging.com/auth/login";
        }

        await signIn.load(mineralURL);

        await signIn.login(username, qaPW);
       
        await dashboard.waitForLoading();
        console.assert(await dashboard.headerIsPresent(), "Dashboard is visible.");
        console.assert(await dashboard.verifyContactExpertsExists, "The Contact Experts widget is found on screen.");

        await ce.CreateCase(Constants.TypeOfHelp.HumanResource, true, null, null, Constants.TicketTypes.Advice, 
            "All States", "Question here", false, null);
    }
    catch (err)
    { 
        console.log(err.stack);
    }
    finally
    {
        // Quit the driver after execution.
        await driver.quit();
    }
}

// Perform the actual call to the function.
initialTest("QA");