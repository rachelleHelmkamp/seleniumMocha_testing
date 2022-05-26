const {By, until, ExpectedConditions, error} = require("selenium-webdriver");
const mineralHeader = require("./mineralHeader");
const Constants = require("../Enums/Constants");

const contactExpertsHeader = { xpath: "//span[text()='CONTACT EXPERTS']" }
const btnPrevious = { xpath: "//button[text()='PREVIOUS']" }
const btnNext = { xpath: "//button[text()='NEXT']" }

// Which type of Expert do you want to contact?
const rbHumanResources = { xpath: "//span[normalize-space(text())='Human Resources']//preceding-sibling::div" }
const rbEHS = { xpath: "//span[normalize-space(text())='Employee Health & Safety']//preceding-sibling::div" }

// How can we help you screen.
const rbMyCompany = { xpath: "//span[normalize-space(text())='My Company']//preceding-sibling::div" }
const rbAClient = { xpath: "//span[normalize-space(text())='A Client']//preceding-sibling::div" }

// Which Client?
const txtSearch = { xpath: "//div[@id='contactAdvisors']//input[@placeholder='Search']" }
const btnFind = { xpath: "//div[@id='contactAdvisors']//button[p[text()='FIND']]" }
// This is to get the list of elements.
const lstClients = { xpath: "//ul[contains(@class,'ClientSearch__ClientList')]/li" }

// Which Client contact?
const txtContactSearch = { xpath: "//div[@id='contactAdvisors']//input[@placeholder='Search']" }
const btnContactFind = { xpath: "//div[@id='contactAdvisors']//button[p[text()='FIND']]" }
// This is to get the list of contacts.
const listClientContacts = { xpath: "//ul[contains(@class,'ContactSearch__Contactlist')]/li" } 

// What kind of help are you looking for.
const rbAdvice = { xpath: "//span[normalize-space(text())='Advice']//preceding-sibling::div" }
const rbPolicyQuestion = { xpath: "//span[normalize-space(text())='Policy Question']//preceding-sibling::div" }
const rbDocumentQuestion = { xpath: "//span[normalize-space(text())='Document Question']//preceding-sibling::div" }

// State selection.
// This returns the list of li items which is the state list
const stateList = { xpath: "//ul[contains(@class, 'States__StatesList')]/li" }

// Question screen
const txtQuestion = { xpath: "//*[@id='root_question' and @label = 'What is Your Question or Issue?']" }
const btnAttachFile = { xpath: "//span[normalize-space(text())='ATTACH FILE']//ancestor::label[1]" }
const btnEditInfo = { xpath: "//a[@href='/profile/edit/']" }

// Submit button
const btnSubmit = { xpath: "//button[text()='SUBMIT']" }

// Completed screen
const wrdsMessageSent = { xpath: "//p[text()='Message Sent!']" }
const lnkCaseID = { xpath: "//p[text()='For reference, your ticket ID is:']/a" }
const btnViewMyCases = { xpath: "//button[span[text()='VIEW MY CASES']]" }
const btnOK = { xpath: "//button[span[text()='OK']]" }

class ContactExperts extends mineralHeader {

    constructor(driver)
    {
        super(driver);
    }

    async SelectTypeOfExpert(typeOfExpert)
    {
        if (typeOfExpert == Constants.TypeOfHelp.HumanResource)
        {
            //await this.driver.findElement(rbHumanResources).click();
            await this.click(rbHumanResources);
        }
        else
        {
            //await this.driver.findElement(rbEHS).click();
            await this.click(rbEHS);
        }

        // Proceed to the type of help screen.
        //await this.driver.findElement(btnNext).click();
        await this.click(btnNext);
    }

    async SelectOBO(myCompany)
    {
        // If creating this for a client company, perform the client selection.
        if (myCompany)
        {
            await this.click(rbMyCompany);
        }
        else
        {
            // Select to create a case for a client.
            await this.click(rbAClient);
        }

        // Proceed to the next screen.
        await this.click(btnNext);
    }

    async SelectClientContact(clientName, clientContact)
    {
        // Search for and select the client company.
        await this.input(txtSearch, clientName);
        await this.click(btnFind);

        // Select the company.
        await this.click(await this.driver.findElements(lstClients)[0]);
        await this.click(btnNext);

        // Search for the contact.
        await this.input(txtContactSearch, clientContact);
        await this.click(btnContactFind);

        // Select the contact.
        await this.click(await this.findElementslistClientContacts)[0];
    }

    async SelectKindOfHelp(kindOfHelp)
    {
        if (kindOfHelp == Constants.TicketTypes.Advice)
            await this.click(rbAdvice);
        else if (kindOfHelp == Constants.TicketTypes.PolicyQuestion)
            await this.click(rbPolicyQuestion);
        else if (kindOfHelp == Constants.TicketTypes.Document)
            await this.click(rbDocumentQuestion);

        // Proceed to the next screen.
        await this.click(btnNext);
    }

    async SelectStates(states)
    {
        let stateBoxes = await this.driver.findElements(stateList);

        // For testing, just select the first one which should be All States
        await stateBoxes[0].click();

        await this.click(btnNext);
    }

    async EnterQuestion(question)
    {
        await this.input(txtQuestion, question);
    }

    async #AttachFiles(document)
    {

    }

    // Method to create a case.
    async CreateCase(typeOfExpert = null, myCompany = true, clientName = null, clientContact = null, kindOfHelp, states, question, 
        shareWithClient = false, documentName = null)
    {
        // Check that the company and client information makes sense.
        // If only one of the client or contact have been provided, throw.
        // If the user is choosing MyCompany, and has provided a client and/or contact, throw.
        if (!myCompany && (clientName == null || clientContact == null))
        {
            throw new Error("Either the client company or client contact provided was null.");
        }

        // May run into choice between HR and EHS, click next.
        if (typeOfExpert != null)
        {
            await this.SelectTypeOfExpert(typeOfExpert, myCompany, clientName, clientContact);
        }

        // Select between myCompany and a client.
        await this.SelectOBO(myCompany);

        // If a client and contact have been provided make the client selection.
        if (clientName != null && clientContact != null)
        {
            await this.SelectClientContact(clientName, clientContact);
        }

        // select the type of help
        await this.SelectKindOfHelp(kindOfHelp);

        // select the states it applies to
        await this.SelectStates(states);

        // enter the question
        await this.EnterQuestion(question);
        
        // optionally attach files
        if (documentName != null)
            await this.AttachFiles(documentName);

        if (!shareWithClient)
            //await this.driver.findElement(share)
        
        // click submit
        await this.click(btnSubmit);

        // Wait for the case number to appear.
        await this.driver.wait(until.elementLocated(wrdsMessageSent));

        // verify a case number has been returned
        console.log(await this.text(lnkCaseID));
    }

    async GoToMyCases()
    {
        await this.click(btnViewMyCases);
    }
}

module.exports = ContactExperts