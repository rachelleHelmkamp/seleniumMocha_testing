const {until} = require("selenium-webdriver");
const CaseCaveLandingPage = require("./CaseCaveLandingPage");
const mineralHeader = require("./mineralHeader");
const MyCases = require("./MyCases");

// Page elements.
const dashboardHeader = { xpath: "//span[text()='My Dashboard']" }
const contactExpertsHeader = { xpath: "//span[text()='CONTACT EXPERTS']" }
const featuredContent = { xpath: "//div[contains(@class,'DashboardContentWidget__FeaturedContentThumb')]" }

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
        await this.hover(mineralHeader.btnAvatar);
        await this.driver.wait(until.elementLocated(mineralHeader.btnTicketingSystem));
        await this.click(mineralHeader.btnTicketingSystem);

        // Create the TicketingSystem POM and wait for it to load.
    }

    async NavigateToCaseCave()
    {
        await this.hover(mineralHeader.btnAvatar);
        await this.click(mineralHeader.btnCaseCave);

        let ccl = new CaseCaveLandingPage(this.driver);
        await ccl.WaitForCaseLoading();
    }

    async NavigateToMyCases()
    {
        await this.hover(mineralHeader.btnAvatar);
        await this.click(mineralHeader.btnMyCases);

        let mc = new MyCases(this.driver);
        await mc.WaitForLoading();
    }
}

module.exports = Dashboard