const {By, Key, Builder, WebElementCondition, WebDriver, until, WebElement, ExpectedConditions} = require("selenium-webdriver");

const basePage = require("./basePage");
const caseCaveHeader = require("./caseCaveHeader")

// Search elements
const txtSearch = { xpath: "//div[contains(@class,'SearchBox__InputContainer')]/input" }
const btnFind = { xpath: "//button[p[text()='FIND']]" }

// Filter elements
const btnFilters = { xpath: "//span[text()='Filters']/ancestor::span" }
const ddType = { id: "dropdown_filter__filter[message_type]" }
const calStart = { xpath: "//input[@placeholder='Start']" }
const calEnd = { xpath: "//input[@placeholder='End']" }
const btnApply = { xpath: "//button[p[text()='APPLY']]" }
const btnReset = { xpath: "//a[text()='RESET']" }
const btnHideFilters = { xpath: "//div[contains(@class,'Filters__ClosePanelContainer')]" }

// Create new message button
const btnCreateNewMessage = { xpath: "(//button[p[text()='Create New Message']])[1]" }

// Modal elements.
const modalBodyXPath = "//div[contains(@class,'ModalBody')]";
const txtModalSearch = { xpath: "//input[@placeholder='Case No.']" }
const btnModalFind = { xpath: `${modalBodyXPath}//button[p[text()='FIND']]` }
const ddModalType = { id: "root_type" }
const txtModalMessage = { xpath: `${modalBodyXPath}//div[contains(@class,'DraftEditor-content')]` }
const btnModalCancel = { xpath: `//div[contains(@class,'ModalActions')]//button[text()='Cancel']` }
const btnModalCreateMessage = { xpath: `//div[contains(@class,'ModalActions')]//button[text()='Create Message']` }

class Messages extends caseCaveHeader
{
    constructor(driver)
    {
        super(driver);
    }

    async ClickFiltersButton()
    {
        await this.click(btnFilters);
    }

    async SelectTypeFilter(selection)
    {
        await this.selectDropdownOption(ddType, selection);
    }

    async SelectStartDate(day)
    {
        await this.selectCalendarDay(calStart, day);
    }

    async SelectEndDate(day)
    {
        await this.selectCalendarDay(calEnd, day);
    }

    async ClickApplyButton()
    {
        await this.click(btnApply);
        await this.WaitForPageLoad();
    }

    async ApplyFilters(type = null, start = null, end = null)
    {
        if (type != null)
            await this.SelectTypeFilter(type);

        if (start != null)
            await this.SelectStartDate(start);

        if (end != null)
            await this.SelectEndDate(end);

        await this.ClickApplyButton();
    }

    async SearchFor(input)
    {
        await this.input(txtSearch, input);

        await this.click(btnFind);

        await this.WaitForPageLoad();
    }

    async ClickCreateNewMessageButton()
    {
        await this.click(btnCreateNewMessage);
    }

    async ModalSearchFor(input)
    {
        await this.input(txtModalSearch, input);

        await this.click(btnModalFind);

        await this.WaitForPageLoad();
    }

    async ModalSelectType(input)
    {
        // This is a click, not a hover.
        await this.click(ddModalType);
        await this.selectDropdownOption(ddModalType, input);
    }

    async ModalInputMessage(message)
    {
        await this.input(txtModalMessage, message);
    }

    async ModalClickCancel()
    {
        await this.click(btnModalCancel);
    }

    async ModalClickCreateMessage()
    {
        await this.click(btnModalCreateMessage);
        await this.WaitForPageLoad();
    }

    async GetTableHeaders()
    {
        var tableHeaders = [];

        // Get all of the elements for each column header.
        var headerElements = await this.driver.findElements({ xpath: "//thead//th//span"});

        for (var i = 0; i < headerElements.length; i++)
        {
            tableHeaders.push(await headerElements[i].getText());
        }
        //headerElements.forEach(element => tableHeaders.push(this.text(element)));

        return tableHeaders;
    }

    async GetValueForColumnAndRow(column, row)
    {
        var xpathToValue = { xpath: `//td[@data-title='${column}'][${row}]` };

        return await this.text(xpathToValue);
    }

    async GetTableRowCount()
    {
        var rowCount = (await this.driver.findElements({ xpath: "//tbody/tr" })).length;
        return rowCount;
    }

    async GetAllValuesInColumn(column)
    {
        var columnText = [];

        // Get all of the elements in the column.
        // If the column is Case No. the item to check is //a, otherwise it's //p
        var elementType = (column == "Case No." ? "//a" : "//p")
        var columnCells = await this.driver.findElements({ xpath: `//td[@data-title='${column}']${elementType}` });

        // Get all of the text for each element in the column.
        for (var i = 0; i < columnCells.length; i++)
        {
            columnText.push(await columnCells[i].getText());
        }

        return columnText;
    }

    async WaitForFilter()
    {
        await this.driver.sleep(3000);
    }

    async WaitForPageLoad()
    {
        var loadingDiamonds = await this.driver.wait(until.elementLocated({ xpath: "//div[contains(@class,'LoadingIcons__LoadingWrapper')]" }));
        await this.driver.wait(until.stalenessOf(loadingDiamonds));
    }
}
module.exports = Messages;