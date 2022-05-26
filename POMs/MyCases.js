const basePage = require("./basePage");

const myCasesHeader = { xpath: "//span[text()='My Cases' and @type='h1']" }
const txtSearchField = { xpath: "//div[contains(@class,'SearchBox__InputContainer')]//input" }
const btnFind = { xpath: "//button[p[text()='FIND']]" }

class MyCases extends basePage {

    constructor(driver)
    {
        super(driver)
    }

}

module.exports = MyCases