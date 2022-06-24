const {By, until, ExpectedConditions} = require("selenium-webdriver");
const mineralHeader = require("./mineralHeader");
const Constants = require("../Enums/Constants");


class caseCaveHeader extends mineralHeader
{
    // Page elements.
    static caseCaveHeaderText = { xpath: "//h1[@title='Case Cave']"}
    static lnkDashboard = { xpath: "//a[@title='Dashboard']" }
    static lnkCases = { xpath: "//a[@title='Cases']" }
    static lnkAssignments = { xpath: "//a[@title='Assignments']" }
    static lnkUnknownCases = { xpath: "//a[@title='Unknown Cases']" }
    static lnkVPA = { xpath: "//a[@title='VPA']" }
    static lnkUserLookup = { xpath: "//a[@title='User Lookup']" }
    static lnkMessages = { xpath: "//a[@title='Messages']" }
    static lnkTransferCases = { xpath: "//a[@title='Transfer Cases']" }
    static lnkPreppedAnswers = { xpath: "//a[@title='Prepped Answers']" }

    constructor(driver)
    {
        super(driver);
    }
}
module.exports = caseCaveHeader;