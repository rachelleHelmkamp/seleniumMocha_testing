const {until} = require("selenium-webdriver");
const CaseCaveLandingPage = require("./CaseCaveLandingPage");
const mineralHeader = require("./mineralHeader");

const dashboardHeader = { xpath: "//span[text()='My Dashboard']" }
const contactExpertsHeader = { xpath: "//span[text()='CONTACT EXPERTS']" }
const featuredContent = { xpath: "//div[contains(@class,'DashboardContentWidget__FeaturedContentThumb')]" }

const btnAvatar = { xpath: "//div[contains(@class,'AppNavigation__NavBarRight')]//div[contains(@class,'UserNav__IconWrapper')]" }
const btnTicketingSystem = { xpath: "//a[text()='Ticketing System']" }
const btnCaseCave = { xpath: "//a[text()='Case Cave']" }

class Dashboard extends mineralHeader {

    constructor(driver)
    {
        super(driver);
    }

    async waitForLoading()
    {
        await this.isDisplayed(featuredContent);
    }
    
    async headerIsPresent()
    {
        return await this.isDisplayed(dashboardHeader);
    }

    async verifyContactExpertsExists()
    {
        return await this.isDisplayed(contactExpertsHeader);
    }

    async NavigateToTicketingSystem()
    {
        await this.hover(btnAvatar);
        await this.driver.wait(until.elementLocated(btnTicketingSystem));
        await this.click(btnTicketingSystem);

        // Create the TicketingSystem POM and wait for it to load.
    }

    async NavigateToCaseCave()
    {
        await this.hover(btnAvatar);
        await this.click(btnCaseCave);

        let ccl = new CaseCaveLandingPage(this.driver);
        await ccl.WaitForCaseLoading();
    }
}

module.exports = Dashboard