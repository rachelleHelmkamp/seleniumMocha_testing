// Pull all the required functions from node_modules.
const globals = require("../global/globals.js");
// These will stay up here, and don't need to be moved to inside any of the Mocha stuff.
const {By, Key, Builder, WebElementCondition, WebDriver, until, WebElement, ExpectedConditions} = require("selenium-webdriver");
require("chromedriver");
var assert = require("assert")
const addContext = require("mochawesome/addContext")

// These are the enums to help keep things organized when specifying values.
const Constants = require("../Enums/Constants.js");
const { addConsoleHandler } = require("selenium-webdriver/lib/logging.js");

describe('Case Cave Case Details - Edit Answer', function()
{
    let driver;
    let pw = "";
    let url = "";

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
    it('Edit Answer', async function()
    {        
        // Reference the POMs that are needed in the test
        const SignIn = require("../POMs/SignIn.js");
        const Dashboard = require("../POMs/Dashboard.js");
        const CaseCaveLanding = require("../POMs/CaseCaveLandingPage");
        const CaseDetails = require("../POMs/CaseDetails");

        // Create the POMs that are being used in the test.
        let signIn = new SignIn(driver);
        let dashboard = new Dashboard(driver);
        let landingPage = new CaseCaveLanding(driver);
        let caseDetails = new CaseDetails(driver);

        // Set the user that will be used in the test.
        var username = "mayur_sa";

        // Sign in to the platform and wait for redirection to the dashboard.
        await signIn.load(url);
        await signIn.login(username, pw);
    
        // Wait for the dashboard page to load.
        await dashboard.waitForLoading();

        // Navigate to the Case Cave landing page. 
        await dashboard.NavigateToCaseCave();

        // Open any case.
        var caseToOpen = globals.RandomNumber(1, await landingPage.GetNumberOfDisplayedCases());

        // Write the case number chosen for logging purposes.
        var caseChosen = `Case number chosen for testing: ${await landingPage.GetCaseIDText(caseToOpen)}.`;
        addContext(this, caseChosen);
        await landingPage.ClickViewButton(caseToOpen);

        // Wait for the details screen to load.
        await caseDetails.WaitForLoading();

        // Get the original answer text, if any, for future comparison.
        var currentAnswerText = await caseDetails.GetAnswer();

        // Click the Add/Edit Answer link.
        await caseDetails.ClickAnswer();

        // Verify the Save/Cancel buttons are now visible.
        assert(await caseDetails.VerifyEditAnswerButtons(), "The Save/Cancel buttons are visible.");

        // Enter text in the now visible answer field.
        var randomAnswerText = `Random answer text ${globals.RandomString()}`;
        await caseDetails.EnterAnswer(randomAnswerText);

        // Click close, and verify no data is shown in the Answer field.
        await caseDetails.CancelAnswer();
        assert(await caseDetails.GetAnswer() == currentAnswerText, "The current answer text is unchanged.");

        // Wait for the page to load again. 
        await caseDetails.WaitForLoading();

        // Enter an answer and save it this time.
        await caseDetails.UpdateAnswer(randomAnswerText);

        // Wait again for the case to reload.
        await caseDetails.WaitForLoading();
        
        // Verify the entered text is visible.
        var newAnswerText = await caseDetails.GetAnswer();
        assert(newAnswerText == currentAnswerText+randomAnswerText, `The Answer has been updated successfully. '${newAnswerText}' should equal '${currentAnswerText}${randomAnswerText}'.`);
    })
})