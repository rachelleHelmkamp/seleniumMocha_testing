const {until} = require("selenium-webdriver");
const basePage = require("./basePage");

class mineralHeader extends basePage
{
    // Page elements.
    static btnAvatar = { xpath: "//div[contains(@class,'AppNavigation__NavBarRight')]//div[contains(@class,'UserNav__IconWrapper')]" }
    static btnTicketingSystem = { xpath: "//a[text()='Ticketing System']" }
    static btnCaseCave = { xpath: "//a[text()='Case Cave']" }
    static btnMyCases = { xpath: "//a[text()='My Cases']" }

    constructor(driver)
    {
        super(driver);
    }
}
module.exports = mineralHeader;