// Pull all the required functions from node_modules.
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
    let vars
    let environment

    beforeEach(async function()
    {
        // Create the driver, and Wait for it to build and launch. 
        driver = await new Builder().forBrowser("chrome").build();

        // Maximize the window.
        await driver.manage().window().maximize();

        // Set variables here, most likely user/environment.
        vars = process.argv;
        vars.forEach((item, index) => 
        {
            console.log(`${index}: ${item}`)
        });
        environment = vars[vars.length - 1];
    })

    afterEach(async function()
    {
        await driver.quit();
    })

    // This is the actual test function.
    it('sort order verification', async function()
    {        
        // POMs used by the test.
        const Dashboard = require("../POMs/Dashboard.js");
        const SignIn = require("../POMs/SignIn.js");
        const CaseCaveLanding = require("../POMs/CaseCaveLandingPage.js");
        const { isTypedArray } = require("util/types");     

        // Create the POMs that are being used in the test.
        let dashboard = new Dashboard(driver);
        let signIn = new SignIn(driver);
        let ccLanding = new CaseCaveLanding(driver);

        var username = "mayur_sa";
        var qaPW = "Pepcusqa@23";

        var mineralURL = "https://apps.qa01.trustmineral-staging.com/auth/login";

        if (environment == 'Alpha')
        {
            //username = "mayur_ta";
            mineralURL = "https://apps.alpha01.trustmineral-staging.com/auth/login";
        }            

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
        assert(oldestID < newestID, `The IDs of the cases are different. Original id: ${oldestID}. Newest id: ${newestID}`);

        // The second created date is after the first created date
        assert(newestCreatedDate > oldestCreatedDate, `The cases have sorted by order. OldestCreationDate: ${friendlyOldDate}. NewestCreationDate: ${friendlyNewDate}`);

        // Search for a single ID and verify the search is working.
        await ccLanding.SearchFor(oldestID);

        assert(await ccLanding.GetNumberOfDisplayedCases() == 1, "The number of displayed cases is correct.");
    })

    // This is the actual test function.
    /* it('login verification', async function()
    {        
        // POMs used by the test.
        const Dashboard = require("../POMs/Dashboard.js");
        const SignIn = require("../POMs/SignIn.js");  

        // Create the POMs that are being used in the test.
        let dashboard = new Dashboard(driver);
        let signIn = new SignIn(driver);

        var username = "mayur_sa";
        var qaPW = "Pepcusqa@23";

        var mineralURL = "https://apps.qa01.trustmineral-staging.com/auth/login";

        // temp here.
        let environment = Constants.Environments.QA;

        if (environment == Constants.Environments.Alpha)
        {
            //username = "mayur_ta";
            mineralURL = "https://apps.alpha01.trustmineral-staging.com/auth/login";
        }            

        // Sign in to the platform and wait for redirection to the dashboard.
        await signIn.load(mineralURL);
        await signIn.login(username, qaPW);
    
        // Wait for the dashboard page to load.
        await dashboard.waitForLoading();
        assert(await dashboard.verifyContactExpertsExists(), "The Contact Experts dashboard is visible.");
    }) */
})