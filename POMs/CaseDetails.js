const {By, until, ExpectedConditions} = require("selenium-webdriver");
const caseCaveHeader = require("./caseCaveHeader");
const Constants = require("../Enums/Constants");
const {caseCaveHeaderText, lnkDashboard, lnkCases, lnkAssignments, lnkUnknownCases, lnkVPA, lnkUserLookup, lnkMessages, lnkTransferCases, lnkPreppedAnswers} = require("./caseCaveHeader");

class CaseDetails extends caseCaveHeader
{
    // Header elements
    static caseNumber = { xpath: "//span[contains(text(), 'Case #')]" }
    static lnkChildParent = {xpath: "//div[contains(@class, 'CaseDetails__ParentChildeCaseContainer')]//*[self::a or self::span]" }
    static btnActions = { xpath: "//button[p[text()='Actions']]" }

    // User Details
    static wrdsUser = { xpath: "//div[text()='USER']/following-sibling::div/div" }
    static wrdsClientCompany = { xpath: "//div[text()='CLIENT COMPANY']/following-sibling::div/div" }
    static wrdsPartnerCompany = { xpath: "//div[text()='PARTNER COMPANY']/following-sibling::div/div" }
    static wrdsPlatform = { xpath: "//div[text()='PLATFORM']/following-sibling::div/div" }
    static wrdsClientEmployees = { xpath: "//div[text()='CLIENT EMPLOYEES']/following-sibling::div/div" }
    static wrdsEmail = { xpath: "//div[text()='EMAIL']/following-sibling::div/div" }
    static wrdsPhone = { xpath: "//div[text()='PHONE']/following-sibling::div/div" }
    static wrdsCases90Days = { xpath: "//div[text()='CASES IN 90 DAYS']/following-sibling::div/div" }
    static wrdsMemberSince = { xpath: "//div[text()='MEMBER SINCE']/following-sibling::div/div" }
    static btnEditUser = { xpath: "//button[div[p[text()='Edit User']]]" }
    static btnEditCompany = { xpath: "//button[div[p[text()='Edit Company']]]" }
    static btnViewAllProducts = { xpath: "//button[p[text()='View All Products']]" }

    // Case Details
    static wrdsCaseType = { xpath: "//div[text()='CASE TYPE']/following-sibling::div/div" }
    static wrdsStatus = { xpath: "//div[text()='STATUS']/following-sibling::div/div" }
    static wrdsSource = { xpath: "//div[text()='SOURCE']/following-sibling::div/div" }
    static wrdsPriority = { xpath: "//div[text()='PRIORITY']/following-sibling::div/div" }
    static wrdsTopics = { xpath: "//div[text()='TOPICS']/following-sibling::div/div" }
    static wrdsCaseEmployees = { xpath: "//div[text()='CASE EMPLOYEES']/following-sibling::div/div" }
    static wrdsContactPreference = { xpath: "//div[text()='CONTACT PREFERENCE']/following-sibling::div/div" }
    static wrdsOutOfScope = { xpath: "//div[text()='OUT OF SCOPE']/following-sibling::div/div" }
    static wrdsImmediateTransfer = { xpath: "//div[text()='IMMEDIATE TRANSFER?']/following-sibling::div/div" }
    static wrdsCaseSubmittedByPartner = { xpath: "//div[text()='CASE SUBMITTED BY PARTNER']/following-sibling::div/div" }
    static wrdsShareResponseWithClient = { xpath: "//div[text()='SHARE RESPONSE WITH CLIENT']/following-sibling::div/div" }
    static wrdsPartnerContact = { xpath: "//div[text()='PARTNER CONTACT']/following-sibling::div/div" }
    static btnEditCaseDetails = { xpath: "//button[p[text()='Edit Case Details']]" }

    // Question & Answer
    static btnQuestionAndAnswer = { xpath: "//span[text()='Question & Answer']" }
    static wrdsQuestion = { xpath: "(//span[text()='Question']/following-sibling::div/p)[1]" }
    static lnkEditQuestion = { xpath: "(//span[text()='Question']/following-sibling::div//a[text()='Edit Question'])[1]" }
    static wrdsAnswer = { xpath: "(//span[text()='Answer']/following-sibling::div/p)[1]" }
    static lnkAddEditAnswer = {xpath: "(//span[text()='Answer']/following-sibling::div//a[text()='Add Answer' or text()='Edit Answer'])[1]" }
    static lnkAddClientAttachment = { xpath: "//a[text()='Add Client Attachment']" }
    static lnkAddExpertAttachment = { xpath: "//a[text()='Add Expert Attachment']" }

    // Fields viewable when editing the Question and Answer
    static txtQuestion = { xpath: "(//span[text()='Question']/following-sibling::div//div[@class='DraftEditor-editorContainer'])[1]/descendant-or-self::span[last()]" }
    static btnQuestionCancel = { xpath: "//span[text()='Question']/following-sibling::div[1]/div[2]/button[text()='Cancel']" }
    static btnQuestionSaveChanges = { xpath: "//span[text()='Question']/following-sibling::div[1]/div[2]/button[text()='Save changes']" }

    static txtAnswer = { xpath: "(//span[text()='Answer']/following-sibling::div//div[@class='DraftEditor-editorContainer'])[1]/descendant-or-self::span[last()]" }
    static btnAnswerCancel = { xpath: "//span[text()='Answer']/following-sibling::div[1]/div[2]/button[text()='Cancel']" }
    static btnAnswerSaveChanges = { xpath: "//span[text()='Answer']/following-sibling::div[1]/div[2]/button[text()='Save changes']" }

    // Resources
    static btnResources = { xpath: "//span[text()='Resources']" }

    // Partner-View Messages
    static btnPartnerViewMessages = { xpath: "//span[text()='Partner-View Messages']" }

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

    async GetAnswer()
    {
        return await this.text(wrdsAnswer);
    }

    async UpdateQuestion(newText)
    {
        // Click on the Edit Question link. 
        await this.click(lnkEditQuestion);

        // Enter the new text in the field.
        await this.input(txtQuestion, newText);

        // Click the Save changes button.
        await this.click(btnQuestionSaveChanges);
    }

    async UpdateAnswer(newText)
    {
        // Click on the Add/Edit Answer link.
        await this.click(lnkAddEditAnswer);

        // Enter the new text in the field.
        await this.input(txtAnswer, newText);

        // Click the Save changes button.
        await this.click(btnAnswerSaveChanges);
    }
}
module.exports = CaseDetails;