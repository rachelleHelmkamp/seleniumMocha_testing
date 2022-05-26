const basePage = require("./basePage");

const USERNAME = { id: "root_userCreds_username" }
const PASSWORD = { id: "root_userCreds_password" }
const signInButton = { xpath: "//button[text()='Sign in']" }

class SignIn extends basePage {

    constructor(driver)
    {
        super(driver)
    }

    async load(url)
    {
        await this.driver.get(url);
    }

    async login(username, password)
    {
        await this.input(USERNAME, username);
        await this.input(PASSWORD, password);
        await this.click(signInButton);
    }

    async waitForDashboardRedirect()
    {

    }
}

module.exports = SignIn