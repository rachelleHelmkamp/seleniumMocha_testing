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

describe('My Cases - Verify my cases page', function()
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
    it('Verify columns and filter functionality', async function()
    {        
        // Reference the POMs that are needed in the test
        const SignIn = require("../POMs/SignIn.js");
        const Dashboard = require("../POMs/Dashboard.js");
        const MyCases = require("../POMs/MyCases.js");

        // Create the POMs that are being used in the test.
        let signIn = new SignIn(driver);
        let dashboard = new Dashboard(driver);
        let myCases = new MyCases(driver);

        // Set the user that will be used in the test.
        var username = "mayur_sa";

        // Sign in to the platform and wait for redirection to the dashboard.
        await signIn.load(url);
        await signIn.login(username, pw);
    
        // Wait for the dashboard page to load.
        await dashboard.waitForLoading();

        // Add comments below for each step you need to perform the test.
        // Navigate to Avatar > My Cases.
        await dashboard.NavigateToMyCases();

        // Wait for the table/page to load.
        // Get all of the columns, and compare them to the expected columns.
        var expectedColumns = [ "Case No.", "Status", "Type", "Question", "Date Submitted", "Client", "" ];
        var actualColumns = await myCases.GetTableHeaders();

        var columnsMatch = (expectedColumns.length == actualColumns.length) && expectedColumns.every(function(element, index) { return element === actualColumns[index]; });

        assert(columnsMatch, "The expected and actual columns present match.");

        // Filter by type and verify all values are of that type.
        await myCases.ClickFiltersButton();
        await myCases.ApplyFilters(null, "Advice", null, null);
        var columnValues = await myCases.GetAllValuesInColumn("Type");
        var columnValuesMatch = columnValues.every(element => element == "Advice");
        assert(columnValuesMatch, "All returned values are of type 'Advice'.");

        // Filter by Status and verify all values are of that status.
        await myCases.ClickResetFilters();
        await myCases.ApplyFilters("Answered", null, null, null);
        columnValues = await myCases.GetAllValuesInColumn("Status");
        columnValuesMatch = columnValues.every(element => element == "Answered");
        assert(columnValuesMatch, "All returned values are of status 'Answered'."); 

        // Filter by start/end date and verify all date submitted values are of that date.
        await myCases.ClickResetFilters();
        var today = new Date();
        var day = today.getDate()
        var dateString = today.toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" });
        await myCases.ApplyFilters(null, null, day, day);
        columnValues = await myCases.GetAllValuesInColumn("Date Submitted");
        columnValuesMatch = columnValues.every(element => element == dateString);
        assert(columnValuesMatch, `All returned values are todays date of ${dateString}.`);
    })
})