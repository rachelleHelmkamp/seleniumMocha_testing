// Pull all the required functions from node_modules
const {By, Key, Builder, WebElementCondition, WebDriver, until, WebElement, ExpectedConditions} = require("selenium-webdriver");
require("chromedriver");

var assert = require("assert")

// POMs used by the test.
const Dashboard = require("../POMs/Dashboard.js");
const SignIn = require("../POMs/SignIn.js");
const CaseCaveLanding = require("../POMs/CaseCaveLandingPage.js")

// These are the enums to help keep things organized when specifying values.
const Constants = require("../Enums/Constants.js");

let error = null;

// Create an example function
async function sortOrderVerification(environment)
{
    // Create the driver, and Wait for it to build and launch. 
    let driver = await new Builder().forBrowser("chrome").build();

    // Create the POMs that are being used in the test.
    let dashboard = new Dashboard(driver);
    let signIn = new SignIn(driver);
    let ccLanding = new CaseCaveLanding(driver);

    // Wrap the code in a try/catch block so if an error is encountered it can be caught and reported on in the end.
    try
    {
        var username = "mayur_sa";
        var qaPW = "Pepcusqa@23";

        var mineralURL = "https://apps.qa01.trustmineral-staging.com/auth/login";

        if (environment == Constants.Environments.Alpha)
        {
            //username = "mayur_ta";
            mineralURL = "https://apps.alpha01.trustmineral-staging.com/auth/login";
        }

        // Maximize the window.
        await driver.manage().window().maximize();

        // Sign in to the platform and wait for redirection to the dashboard.
        await signIn.load(mineralURL);
        await signIn.login(username, qaPW);
       
        // Wait for the dashboard page to load.
        await dashboard.waitForLoading();

        // Navigate to the case cave landing page.
        await dashboard.NavigateToCaseCave();

        // Sort the results by Sort by Created Date: Oldest to Newest.
        await ccLanding.SelectSortByOption("Created Date: Oldest to Newest");

        // Get the ID and Created Date of the top card.
        let oldestID = parseInt(await ccLanding.GetCaseIDText(1));
        let friendlyOldDate = await ccLanding.GetCaseCreatedDateText(1);
        let oldestCreatedDate = Date.parse(friendlyOldDate);

        // Sort the results by Sort by Created Date: Newest to Oldest.
        await ccLanding.SelectSortByOption("Created Date: Newest to Oldest");

        // Get the ID and Created Date of the top card again. 
        let newestID = parseInt(await ccLanding.GetCaseIDText(1));
        let friendlyNewDate = await ccLanding.GetCaseCreatedDateText(1);
        let newestCreatedDate = Date.parse(friendlyNewDate);

        // Compare the two values from each sort and verify:
        // the IDs are not the same
        //console.log(oldestID < newestID, `The IDs of the cases are different. Original id: ${oldestID}. Newest id: ${newestID}`);
        assert(oldestID<newestID, `The IDs of the cases are different. Original id: ${oldestID}. Newest id: ${newestID}`);

        // The second created date is after the first created date
        //console.log(newestCreatedDate > oldestCreatedDate, `The cases have sorted by order. OldestCreationDate: ${friendlyOldDate}. NewestCreationDate: ${friendlyNewDate}`);
        assert(newestCreatedDate > oldestCreatedDate, `The cases have sorted by order. OldestCreationDate: ${friendlyOldDate}. NewestCreationDate: ${friendlyNewDate}`);

        await ccLanding.SearchFor(oldestID);

        //console.log(`The number of displayed cases is now: ${await ccLanding.GetNumberOfDisplayedCases()}`);
        assert(await ccLanding.GetNumberOfDisplayedCases() == 1, "The number of displayed cases is correct.");
    }
    catch (err)
    { 
        console.log(err.stack);
        error = err;
    }
    finally
    {
        if (error == null)
            console.log("Test passed successfully.");
        else
            console.log("The test case failed: " + error.stack)

        // Quit the driver after execution.
        await driver.quit();
    }
}

// Perform the actual call to the function.
sortOrderVerification(Constants.Environments.QA);