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

describe('Case Cave Messages - Create New Message', function()
{
    let driver
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
    it('Create new message', async function()
    {        
        // Reference the POMs that are needed in the test
        const SignIn = require("../POMs/SignIn.js");
        const Dashboard = require("../POMs/Dashboard.js");
        const CaseCaveLandingPage = require("../POMs/CaseCaveLandingPage");
        const Messages = require("../POMs/CaseCaveMessages");

        // Create the POMs that are being used in the test.
        let signIn = new SignIn(driver);
        let dashboard = new Dashboard(driver);
        let ccl = new CaseCaveLandingPage(driver);
        let messages = new Messages(driver);

        // Set the user that will be used in the test.
        var username = "hrpro@xyz.com";

        // The case numbers to use.
        var caseNumber = "";
        if (url.includes("qa"))
            caseNumber = "736516";
        else
            caseNumber = "323";
        
        // Test data logging.        
        addContext(this, `Test run in '${url}' environment with user '${username}'.`)

        // Sign in to the platform and wait for redirection to the dashboard.
        await signIn.load(url);
        await signIn.login(username, pw);
    
        // Wait for the dashboard page to load.
        await dashboard.waitForLoading();

        // Navigate to the Case Cave Landing page.
        await dashboard.NavigateToCaseCave();

        // Navigate to the Messages page.
        await ccl.NavigateToMessages();

        // Click on Create New Message.
        await messages.ClickCreateNewMessageButton();

        // Enter the case number, and search for it.
        await messages.ModalSearchFor(caseNumber);

        // Select a type option (Payroll).
        await messages.ModalSelectType("Payroll");

        // Enter a message.
        let newMessage = `New Message ${globals.RandomString(10, true)}`;
        await messages.ModalInputMessage(newMessage);

        // Click Create Message.
        await messages.ModalClickCreateMessage();

        // Verify the message now shows up in the table.
        await messages.SearchFor(newMessage);

        // Verify the case is displayed in the table.
        var resultsCount = await messages.GetTableRowCount();
        assert(resultsCount == 1, "The newly created message is displayed in the table.");
    })
})