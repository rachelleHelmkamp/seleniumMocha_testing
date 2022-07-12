const {By, until, ExpectedConditions, Actions, WebDriver} = require("selenium-webdriver");

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
        await this.driver.wait(until.elementLocated(locator));
        return this.find(locator).click();
    }

    async hover(locator)
    {
        await this.driver.wait(until.elementLocated(locator));
        let elementToMoveTo = await this.find(locator);
        await this.driver.actions({async:true}).move({x:0,y:0,origin:elementToMoveTo}).perform();
    }

    async input(locator, text, clearFirst = false)
    {
        await this.driver.wait(until.elementLocated(locator));

        if (clearFirst)
        {
            await this.click(locator);
            await this.clear(locator);
        }

        await this.find(locator).sendKeys(text);
    }

    async isDisplayed(locator)
    {
        await this.driver.wait(until.elementLocated(locator));
        return await this.find(locator).isDisplayed();
    }

    async text(locator)
    {
        await this.driver.wait(until.elementLocated(locator));
        return await this.find(locator).getText();
    }

    async exists(locator)
    {
        return await this.driver.findElements(locator).length > 0;
    }

    async clear(locator)
    {
        await this.driver.wait(until.elementLocated(locator)) && this.driver.wait(until.elementIsEnabled(locator));
        return await this.driver.findElement(locator).clear();
    }
}

module.exports = basePage