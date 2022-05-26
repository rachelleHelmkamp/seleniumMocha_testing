const {By, until, ExpectedConditions} = require("selenium-webdriver");
const mineralHeader = require("./mineralHeader");
const Constants = require("../Enums/Constants");

const caseCaveHeaderText = { xpath: "//h1[@title='Case Cave']"}
const lnkDashboard = { xpath: "//a[@title='Dashboard']" }
const lnkCases = { xpath: "//a[@title='Cases']" }
const lnkAssignments = { xpath: "//a[@title='Assignments']" }
const lnkUnknownCases = { xpath: "//a[@title='Unknown Cases']" }
const lnkVPA = { xpath: "//a[@title='VPA']" }
const lnkUserLookup = { xpath: "//a[@title='User Lookup']" }
const lnkMessages = { xpath: "//a[@title='Messages']" }
const lnkTransferCases = { xpath: "//a[@title='Transfer Cases']" }
const lnkPreppedAnswers = { xpath: "//a[@title='Prepped Answers']" }

class caseCaveHeader extends mineralHeader
{
    constructor(driver)
    {
        super(driver);
    }
}
module.exports = caseCaveHeader;