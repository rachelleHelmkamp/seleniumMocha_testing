const {By, until, ExpectedConditions} = require("selenium-webdriver");
const caseCaveHeader = require("./caseCaveHeader");
const Constants = require("../Enums/Constants");
const {caseCaveHeaderText, lnkDashboard, lnkCases, lnkAssignments, lnkUnknownCases, lnkVPA, lnkUserLookup, lnkMessages, lnkTransferCases, lnkPreppedAnswers} = require("./caseCaveHeader");
const ccHeader = require("./caseCaveHeader");
const Messages = require("./CaseCaveMessages");

// Filter elements.
const btnHideFilters = { xpath: "//div[contains(@class,'Filters__CollapsePanelWrapper')]" }
const btnShowFilters = { xpath: "//span[contains(@class,'Filters__FilterToggle')]" }

const ddSavedSearches = { id: "dropdown_filter__savedSearches" }
const btnAllCases = { xpath: "//div[text()='All Cases']" }
const lnkResetAllFilters = { xpath: "//div[text()='Reset All Filters']" }

// Sort order dropdown
const ddSortOrder = { xpath: "(//div[contains(@class,'RavenSelect__control')])[1]" }
const ddTypeDisplay = { xpath: "(//div[contains(@class,'RavenSelect__control')])[2]" }
const txtSearch = { xpath: "//input[@placeholder='Search Case Cave']" }
const btnSearch = { xpath: "//button[p[text()='Search']]" }

// Case type toggle
const rbExpertsAndFrontline = { xpath: "//span[text()='Experts and Frontline']/preceding-sibling::div" }
const rbTechnicalSupport = { xpath: "//span[text()='Technical Support']/preceding-sibling::div" }

const xpathForCaseCards = "//div[contains(@class,'CaseList__CaseListContainer')]"

class CaseCaveLandingPage extends caseCaveHeader
{
    constructor(driver)
    {
        super(driver);
    }

    async GetNumberOfDisplayedCases()
    {
        return (await this.driver.findElements({ xpath: `${xpathForCaseCards}/div` })).length;
    }

    // For the following methods, combine the xpathForCaseCards and previewPath along with index to get the xpath to the element.
    async GetCasePreviewText(index)
    {
        let previewPath = "//div[text()='PREVIEW']/following-sibling::div/div";
        let fullPath = `${xpathForCaseCards}/div[${index}]${previewPath}`;
        return this.text({ xpath: fullPath });
    }

    async GetCaseIDText(index)
    {
        let previewPath = "//div[text()='CASE ID']/following-sibling::div/div";
        let fullPath = `${xpathForCaseCards}/div[${index}]${previewPath}`;
        return this.text({ xpath: fullPath });
    }

    async GetCaseStatusText(index)
    {
        let previewPath = "//div[text()='STATUS']/following-sibling::div/div";
        let fullPath = `${xpathForCaseCards}/div[${index}]${previewPath}`;
        return this.text({ xpath: fullPath });
    }

    async GetCaseSourceText(index)
    {
        let previewPath = "//div[text()='SOURCE']/following-sibling::div/div";
        let fullPath = `${xpathForCaseCards}/div[${index}]${previewPath}`;
        return this.text({ xpath: fullPath });
    }

    async GetCaseUserNameText(index)
    {
        let previewPath = "//div[text()='USER NAME']/following-sibling::div/div";
        let fullPath = `${xpathForCaseCards}/div[${index}]${previewPath}`;
        return this.text({ xpath: fullPath });
    }

    async GetCasePartnerNameText(index)
    {
        let previewPath = "//div[text()='PARTNER NAME']/following-sibling::div/div";
        let fullPath = `${xpathForCaseCards}/div[${index}]${previewPath}`;
        return this.text({ xpath: fullPath });
    }

    async GetCaseCompanyNameText(index)
    {
        let previewPath = "//div[text()='COMPANY NAME']/following-sibling::div/div";
        let fullPath = `${xpathForCaseCards}/div[${index}]${previewPath}`;
        return this.text({ xpath: fullPath });
    }

    async GetCaseStatesText(index)
    {
        let previewPath = "//div[text()='STATES']/following-sibling::div/div";
        let fullPath = `${xpathForCaseCards}/div[${index}]${previewPath}`;
        return this.text({ xpath: fullPath });
    }

    async GetCaseTopicsText(index)
    {
        let previewPath = "//div[text()='TOPICS']/following-sibling::div/div";
        let fullPath = `${xpathForCaseCards}/div[${index}]${previewPath}`;
        return this.text({ xpath: fullPath });
    }

    async GetCaseCaseTypeText(index)
    {
        let previewPath = "//div[text()='CASE TYPE']/following-sibling::div/div";
        let fullPath = `${xpathForCaseCards}/div[${index}]${previewPath}`;
        return this.text({ xpath: fullPath });
    }

    async GetCaseRoleText(index)
    {
        let previewPath = "//div[text()='ROLE']/following-sibling::div/div";
        let fullPath = `${xpathForCaseCards}/div[${index}]${previewPath}`;
        return this.text({ xpath: fullPath });
    }

    async GetCasePhoneNumberText(index)
    {
        let previewPath = "//div[text()='PHONE NUMBER']/following-sibling::div/div";
        let fullPath = `${xpathForCaseCards}/div[${index}]${previewPath}`;
        return this.text({ xpath: fullPath });
    }

    async GetCaseCreatedDateText(index)
    {
        let previewPath = "//div[text()='CREATED DATE']/following-sibling::div/div";
        let fullPath = `${xpathForCaseCards}/div[${index}]${previewPath}`;
        return this.text({ xpath: fullPath });
    }

    async GetCaseDueInText(index)
    {
        let previewPath = "//div[text()='DUE IN' or text()='PAST DUE']/following-sibling::div/div";
        let fullPath = `${xpathForCaseCards}/div[${index}]${previewPath}`;
        return this.text(fullPath);
    }

    async GetCaseDueDateText(index)
    {
        let previewPath = "//div[text()='DUE DATE']/following-sibling::div/div";
        let fullPath = `${xpathForCaseCards}/div[${index}]${previewPath}`;
        return this.text({ xpath: fullPath });
    }

    async GetCaseClosedDateText(index)
    {
        let previewPath = "//div[text()='CLOSED DATE']/following-sibling::div/div";
        let fullPath = `${xpathForCaseCards}/div[${index}]${previewPath}`;
        return this.text({ xpath: fullPath });
    }

    async GetCaseAssigneeText(index)
    {
        let previewPath = "//div[text()='ASSIGNEE']/following-sibling::div/div";
        let fullPath = `${xpathForCaseCards}/div[${index}]${previewPath}`;
        return this.text({ xpath: fullPath });
    }

    async ClickViewButton(index)
    {
        await this.click({ xpath: `(//button[text()='View'])[${index}]` });
    }

    async SelectSortByOption(option)
    {
        await this.click(ddSortOrder);
        let selectedOption = `//*[text()='${option}']`;
        await this.click({ xpath: selectedOption });

        this.WaitForCaseLoading();
    }

    async SearchFor(input)
    {
        await this.input(txtSearch, input);
        await this.click(btnSearch);
        await this.WaitForCaseLoading();
    }

    async NavigateToMessages()
    {
        await this.click(lnkMessages);

        var mes = new Messages(this.driver);
        await mes.WaitForPageLoad();
    }

    async WaitForCaseLoading()
    {
        await this.driver.wait(await until.elementsLocated({ xpath: `//div[contains(@class,'CaseList__CaseListContainer') or text()='No matching cases found.']` }, 30000));
        await this.hover(caseCaveHeaderText);
    }
}
module.exports = CaseCaveLandingPage;