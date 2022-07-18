const {By, Key, Builder, WebElementCondition, WebDriver, until, WebElement, ExpectedConditions} = require("selenium-webdriver");

const basePage = require("./basePage");
const caseCaveHeader = require("./caseCaveHeader")

const myCasesHeader = { xpath: "//span[text()='My Cases' and @type='h1']" }
const txtSearchField = { xpath: "//div[contains(@class,'SearchBox__InputContainer')]//input" }
const btnFind = { xpath: "//button[p[text()='FIND']]" }

// Filters
const btnFilter = { xpath: "//span[text()='Filters']" }
const ddType = { xpath: "//span[text()='Type' and @type='documentFilter']/ancestor::div[1]" }
const ddStatus = { xpath: "//span[text()='Status' and @type='documentFilter']/ancestor::div[1]" }
const calStart = { xpath: "//input[@placeholder='Start' and contains(@class,'DatePickerInput')]" }
const calEnd = { xpath: "//input[@placeholder='End' and contains(@class,'DatePickerInput')]" }
const btnApply = { xpath: "//button[p[text()='APPLY']]" }
const btnReset = { xpath: "//a[text()='RESET']" }
const btnCloseFilters = { xpath: "//div[contains(@class, 'ClosePanelContainer')]" }

// My Cases/Client Cases tabs
const btnMyCases = { xpath: "//li[text()='My Cases']" }
const btnClientCases = { xpath: "//li[text()='Client Cases']" }

// Additional filter for client cases.
const ddSubmittedBy = { xpath: "//span[text()='Submitted By' and @type='documentFilter']/ancestor::div[1]" }


class MyCases extends caseCaveHeader {

    constructor(driver)
    {
        super(driver)
    }

    async ClickMyCasesTab()
    {
        await this.click(btnMyCases);
        await this.WaitForFilterRefresh();
    }

    async ClickClientCasesTab()
    {
        await this.click(btnClientCases);
        await this.WaitForFilterRefresh();
    }

    async ClickFiltersButton()
    {
        await this.click(btnFilter);
    }

    async ApplyTypeFilter(type)
    {
        await this.SelectTypeOption(type);
        await this.click(btnApply);
        await this.WaitForFilterRefresh();
    }

    // Method to perform a select for Type
    async SelectTypeOption(input)
    {
        // Hover over the Type dropdown.
        await this.hover(ddType);

        // Create the xpath to the option to select
        var elementToSelect = { xpath: `//div[text()='${input}' and contains(@id,'react-select')]`};

        // Click on that option.
        await this.click(elementToSelect);
    }

    // Method to perform a select for Status
    async SelectStatusOption(input)
    {
        // Hover over the Type dropdown.
        await this.hover(ddStatus);

        // Create the xpath to the option to select
        var elementToSelect = { xpath: `//div[text()='${input}' and contains(@id,'react-select')]`};

        // Click on that option.
        await this.click(elementToSelect);
    }

    async ApplyStatusFilter(input)
    {
        await this.SelectStatusOption(input);
        await this.click(btnApply);
        await this.WaitForFilterRefresh();
    }

    // Method to enter start date
    async SelectStartDay(day)
    {
        await this.click(calStart);

        var dateToPick = { xpath: `//div[contains(@class,'react-datepicker__day') and not(contains(@class,'--outside-month')) and text()='${day}']` };

        await this.click(dateToPick);
    }

    // Method to enter end date
    async SelectEndDay(day)
    {
        await this.click(calEnd);

        var dateToPick = { xpath: `//div[contains(@class,'react-datepicker__day') and not(contains(@class,'--outside-month')) and text()='${day}']` };

        await this.click(dateToPick);
    }

    async SelectSubmittedBy(person)
    {
        await this.click(ddSubmittedBy);

        var elementToSelect = { xpath: `//div[text()='${input}' and contains(@id,'react-select')]`};

        await this.click(elementToSelect);
    }

    async ApplyFilters(status = null, type = null, startDay = null, endDay = null, submittedBy = null)
    {
        if (status != null)
            await this.SelectStatusOption(status);
        
        if (type != null)
            await this.SelectTypeOption(type);

        if (startDay != null)
            await this.SelectStartDay(startDay);

        if (endDay != null)
            await this.SelectEndDay(endDay);

        if (submittedBy != null)
            await this.SelectSubmittedBy(submittedBy);

        await this.ClickApplyFilters();

    }

    async ClickApplyFilters()
    {
        await this.click(btnApply);
        await this.WaitForFilterRefresh();
    }

    async ClickResetFilters()
    {
        await this.click(btnReset);
        await this.WaitForFilterRefresh();
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
        return await this.driver.findelements({ xpath: "//tbody/tr" }).length;
    }

    async ClickCaseNoLink(caseNumber)
    {
        await this.click({ xpath: `//a[text()='${caseNumber}']` });
    }

    async ClickCaseLinkInRow(row)
    {
        await this.click({ xpath: `(//tbody/tr[${row}]//a)[1]` });
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

    async WaitForLoading()
    {
        await this.isDisplayed(btnFilter);
    }

    async WaitForFilterRefresh()
    {        
        await this.driver.sleep(4000);
    }
}

module.exports = MyCases