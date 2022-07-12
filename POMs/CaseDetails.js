const {By, until, ExpectedConditions} = require("selenium-webdriver");
const caseCaveHeader = require("./caseCaveHeader");
const Constants = require("../Enums/Constants");

// Page elements.

// Header elements
const caseNumber = { xpath: "//span[contains(text(), 'Case #')]" }
const lnkChildParent = {xpath: "//div[contains(@class, 'CaseDetails__ParentChildeCaseContainer')]//*[self::a or self::span]" }
const btnActions = { xpath: "//button[p[text()='Actions']]" }

// User Details
const wrdsUser = { xpath: "//div[text()='USER']/following-sibling::div/div" }
const wrdsClientCompany = { xpath: "//div[text()='CLIENT COMPANY']/following-sibling::div/div" }
const wrdsPartnerCompany = { xpath: "//div[text()='PARTNER COMPANY']/following-sibling::div/div" }
const wrdsPlatform = { xpath: "//div[text()='PLATFORM']/following-sibling::div/div" }
const wrdsClientEmployees = { xpath: "//div[text()='CLIENT EMPLOYEES']/following-sibling::div/div" }
const wrdsEmail = { xpath: "//div[text()='EMAIL']/following-sibling::div/div" }
const wrdsPhone = { xpath: "//div[text()='PHONE']/following-sibling::div/div" }
const wrdsCases90Days = { xpath: "//div[text()='CASES IN 90 DAYS']/following-sibling::div/div" }
const wrdsMemberSince = { xpath: "//div[text()='MEMBER SINCE']/following-sibling::div/div" }
const btnEditUser = { xpath: "//button[div[p[text()='Edit User']]]" }
const btnEditCompany = { xpath: "//button[div[p[text()='Edit Company']]]" }
const btnViewAllProducts = { xpath: "//button[p[text()='View All Products']]" }

// Case Details
const wrdsCaseType = { xpath: "//div[text()='CASE TYPE']/following-sibling::div/div" }
const wrdsStatus = { xpath: "//div[text()='STATUS']/following-sibling::div/div" }
const wrdsSource = { xpath: "//div[text()='SOURCE']/following-sibling::div/div" }
const wrdsPriority = { xpath: "//div[text()='PRIORITY']/following-sibling::div/div" }
const wrdsTopics = { xpath: "//div[text()='TOPICS']/following-sibling::div/div" }
const wrdsCaseEmployees = { xpath: "//div[text()='CASE EMPLOYEES']/following-sibling::div/div" }
const wrdsContactPreference = { xpath: "//div[text()='CONTACT PREFERENCE']/following-sibling::div/div" }
const wrdsOutOfScope = { xpath: "//div[text()='OUT OF SCOPE']/following-sibling::div/div" }
const wrdsImmediateTransfer = { xpath: "//div[text()='IMMEDIATE TRANSFER?']/following-sibling::div/div" }
const wrdsCaseSubmittedByPartner = { xpath: "//div[text()='CASE SUBMITTED BY PARTNER']/following-sibling::div/div" }
const wrdsShareResponseWithClient = { xpath: "//div[text()='SHARE RESPONSE WITH CLIENT']/following-sibling::div/div" }
const wrdsPartnerContact = { xpath: "//div[text()='PARTNER CONTACT']/following-sibling::div/div" }
const btnEditCaseDetails = { xpath: "//button[p[text()='Edit Case Details']]" }

// Question & Answer
const btnQuestionAndAnswer = { xpath: "//span[text()='Question & Answer']" }
const wrdsQuestion = { xpath: "(//span[text()='Question']/following-sibling::div/p)[1]" }
const lnkEditQuestion = { xpath: "(//span[text()='Question']/following-sibling::div//a[text()='Edit Question'])[1]" }
const wrdsAnswer = { xpath: "(//span[text()='Answer']/following-sibling::div/p)[1]" }
const lnkAddEditAnswer = {xpath: "(//span[text()='Answer']/following-sibling::div//a[text()='Add Answer' or text()='Edit Answer'])[1]" }
const lnkAddClientAttachment = { xpath: "//a[text()='Add Client Attachment']" }
const lnkAddExpertAttachment = { xpath: "//a[text()='Add Expert Attachment']" }

// Fields viewable when editing the Question and Answer
const txtQuestion = { xpath: "(//span[text()='Question']/following-sibling::div//div[@class='DraftEditor-editorContainer'])[1]/descendant-or-self::span[last()]" }
const btnQuestionCancel = { xpath: "//span[text()='Question']/following-sibling::div[1]/div[2]/button[text()='Cancel']" }
const btnQuestionSaveChanges = { xpath: "//span[text()='Question']/following-sibling::div[1]/div[2]/button[text()='Save changes']" }

//const txtAnswer = { xpath: "(//span[text()='Answer']/following-sibling::div//div[@class='DraftEditor-editorContainer'])[1]/descendant-or-self::span[last()]" }
const txtAnswer = { xpath: "(//span[text()='Answer']/following-sibling::div//div[@class='DraftEditor-editorContainer'])/div" }
const btnAnswerCancel = { xpath: "//span[text()='Answer']/following-sibling::div[1]/div[2]/button[text()='Cancel']" }
const btnAnswerSaveChanges = { xpath: "//span[text()='Answer']/following-sibling::div[1]/div[2]/button[text()='Save changes']" }

// Resources
const btnResources = { xpath: "//span[text()='Resources']" }

// Partner-View Messages
const btnPartnerViewMessages = { xpath: "//span[text()='Partner-View Messages']" }

// Case Log
const wrdsCaseLog = { xpath: "//span[text()='Case Log']" }

class CaseDetails extends caseCaveHeader
{
    constructor(driver)
    {
        super(driver);
    }

    async SelectActionsItem(menuItem)
    {
        await this.click(btnActions);
        await this.click({ xpath: `//button[text()='${menuItem}'`});
    }

    async GetUserText()
    {
        return await this.text(wrdsUser);
    }

    async GetClientCompany()
    {
        return await this.text(wrdsClientCompany);
    }

    async GetPartnerCompany()
    {
        return await this.text(wrdsPartnerCompany);
    }

    async GetPlatform()
    {
        return await this.text(wrdsPlatform);
    }

    async GetClientEmployees()
    {
        return await this.text(wrdsClientEmployees);
    }

    async GetEmail()
    {
        return await this.text(wrdsEmail);
    }

    async GetPhone()
    {
        return await this.text(wrdsPhone);
    }

    async GetCasesIn90Days()
    {
        return await this.text(wrdsCases90Days);
    }

    async GetMemberSince()
    {
        return await this.text(wrdsMemberSince);
    }

    async GetCaseType()
    {
        return await this.text(wrdsCaseType);
    }

    async GetStatus()
    {
        return await this.text(wrdsStatus);
    }

    async GetSource()
    {
        return await this.text(wrdsSource);
    }

    async GetPriority()
    {
        return await this.text(wrdsPriority);
    }

    async GetTopics()
    {
        return await this.text(wrdsTopics);
    }

    async GetCaseEmployees()
    {
        return await this.text(wrdsCaseEmployees);
    }

    async GetContactPreference()
    {
        return await this.text(wrdsContactPreference);
    }

    async GetOutOfScope()
    {
        return await this.text(wrdsOutOfScope);
    }

    async GetImmediateTransfer()
    {
        return await this.text(wrdsImmediateTransfer);
    }

    async GetCaseSubmittedByPartner()
    {
        return await this.text(wrdsCaseSubmittedByPartner);
    }

    async GetShareResponseWithClient()
    {
        return await this.text(wrdsShareResponseWithClient);
    }

    async GetPartnerContact()
    {
        return await this.text(wrdsPartnerContact);
    }

    async GetQuestion()
    {
        return await this.text(wrdsQuestion);
    }

    async ClickQuestion()
    {
        await this.click(lnkEditQuestion);
    }

    async EnterQuestion(text, clearFirst = false)
    {
        await this.input(txtQuestion, text, clearFirst);
    }

    async GetAnswer()
    {
        return await this.text(wrdsAnswer);
    }
    
    async ClickAnswer()
    {
        await this.click(lnkAddEditAnswer);
    }

    async EnterAnswer(text, clearFirst = false)
    {
        await this.input(txtAnswer, text, clearFirst);
    }

    async CancelAnswer()
    {
        await this.click(btnAnswerCancel);
    }

    async UpdateQuestion(newText, clearFirst = false)
    {
        // Click on the Edit Question link. 
        await this.ClickQuestion();

        // Enter the new text in the field.
        await this.EnterQuestion(newText, clearFirst);

        // Click the Save changes button.
        await this.click(btnQuestionSaveChanges);
    }

    async UpdateAnswer(newText, clearFirst = false)
    {
        // Click on the Add/Edit Answer link.
        await this.ClickAnswer();

        // Enter the new text in the field.
        await this.EnterAnswer(newText, clearFirst);

        // Click the Save changes button.
        await this.click(btnAnswerSaveChanges);
    }

    async VerifyEditQuestionButtons()
    {
        var buttonsFound = false;
        buttonsFound = this.isDisplayed(btnQuestionCancel) && this.isDisplayed(btnQuestionSaveChanges);

        return buttonsFound;
    }

    async VerifyEditAnswerButtons()
    {
        var buttonsFound = false;
        buttonsFound = this.isDisplayed(btnAnswerCancel) && this.isDisplayed(btnAnswerSaveChanges);

        return buttonsFound;
    }

    async WaitForLoading()
    {
        await this.isDisplayed(wrdsCaseLog);
    }
}
module.exports = CaseDetails;