const {until} = require("selenium-webdriver");
const basePage = require("./basePage");

const btnAvatar = { xpath: "//div[contains(@class,'AppNavigation__NavBarRight')]//div[contains(@class,'UserNav__IconWrapper')]" }
const btnTicketingSystem = { xpath: "//a[text()='Ticketing System']" }
const btnCaseCave = { xpath: "//a[text()='Case Cave']" }

class mineralHeader extends basePage
{
    constructor(driver)
    {
        super(driver);

        this.btnAvatar = { xpath: "//div[contains(@class,'AppNavigation__NavBarRight')]//div[contains(@class,'UserNav__IconWrapper')]" };
        this.btnTicketingSystem = { xpath: "//a[text()='Ticketing System']" };
        this.btnCaseCave = { xpath: "//a[text()='Case Cave']" }
    }
}
module.exports = mineralHeader;