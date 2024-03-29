const {By, until, ExpectedConditions, Actions, WebDriver} = require("selenium-webdriver");

const elementTimeout = 180000;

class basePage
{
    constructor(driver)
    {
        this.driver = driver;
    }

    async visit(url)
    {
        await this.driver.get(url);
    }

    find(locator)
    {
        return this.driver.findElement(locator);
    }

    async click(locator)
    {
        await this.driver.wait(until.elementLocated(locator), elementTimeout);
        return this.find(locator).click();
    }

    async hover(locator)
    {
        await this.driver.wait(until.elementLocated(locator), elementTimeout);
        let elementToMoveTo = await this.find(locator);
        await this.driver.actions({async:true}).move({x:0,y:0,origin:elementToMoveTo}).perform();
    }

    async input(locator, text, clearFirst = false)
    {
        await this.driver.wait(until.elementLocated(locator), elementTimeout);

        if (clearFirst)
        {
            await this.click(locator);
            await this.clear(locator);
        }

        await this.find(locator).sendKeys(text);
    }

    async isDisplayed(locator)
    {
        await this.driver.wait(until.elementLocated(locator), elementTimeout);
        return await this.find(locator).isDisplayed();
    }

    async text(locator)
    {
        await this.driver.wait(until.elementLocated(locator), elementTimeout);
        return await this.find(locator).getText();
    }

    async exists(locator)
    {
        return await this.driver.findElements(locator).length > 0;
    }

    async clear(locator)
    {
        await this.driver.wait(until.elementLocated(locator), elementTimeout) && this.driver.wait(until.elementIsEnabled(locator), elementTimeout);
        return await this.driver.findElement(locator).clear();
    }

    async isActive(locator)
    {
        await this.driver.wait(until.elementLocated(locator), elementTimeout);
        return await this.find(locator).getAttribute('disabled') !=null ;
    }

    async selectDropdownOption(dropdown, option)
    {
        await this.driver.wait(until.elementLocated(dropdown), elementTimeout);
        await this.hover(dropdown);

        var xpathToSelection = { xpath: `//div[text()='${option}' and contains(@id,'react-select')]` }

        await this.click(xpathToSelection);
    }

    async selectCalendarDay(selector, day)
    {
        await this.driver.wait(until.elementLocated(selector), elementTimeout);
        await this.click(selector);

        var dateToPick = { xpath: `//div[contains(@class,'react-datepicker__day') and not(contains(@class,'--outside-month')) and text()='${day}']` };

        await this.click(dateToPick);
    }

    async WaitForLoadingDiamonds()
    {
        var loadingDiamonds = await this.driver.wait(until.elementLocated({ xpath: "//div[contains(@class,'LoadingIcons__LoadingWrapper')]" }));
        await this.driver.wait(until.stalenessOf(loadingDiamonds));
    }
}

module.exports = basePage