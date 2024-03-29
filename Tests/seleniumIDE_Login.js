// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
require("chromedriver");
const assert = require('assert')
const globals = require("../global/globals.js");
const addContext = require("mochawesome/addContext")

describe('LoginAndVerifyContactExperts', function() {
  this.timeout(30000)
  let driver
  let pw
  let url

  before(async function()
  {
    // This handles getting the needed variables for the environment specified in 
    let envVars = await globals.GetEnvironmentVariables();

    // Set variables here, most likely user/environment.
    url = envVars[0];
    pw = envVars[1];
  })
  beforeEach(async function() {
    driver = await globals.CreateDriver();
  })

  afterEach(async function() {
    await driver.quit();
  })

  it('LoginAndVerifyContactExperts', async function() {
    await driver.get(url)
    await driver.manage().window().setRect({ width: 1550, height: 838 })
    await driver.findElement(By.id("root_userCreds_username")).click()
    await driver.findElement(By.id("root_userCreds_username")).sendKeys("mayur_ta")
    await driver.findElement(By.id("root_userCreds_password")).click()
    await driver.findElement(By.id("root_userCreds_password")).sendKeys(pw)
    await driver.findElement(By.css(".Button-sc-1v2whja-0")).click()
    await driver.wait(until.elementLocated(By.xpath("//p[text()=\'Which type of Expert do you want to contact?\']")), 30000)
    assert(await driver.findElement(By.xpath("//p[text()='Which type of Expert do you want to contact?']")).getText() == "Which type of Expert do you want to contact?")
    assert(await driver.findElement(By.xpath("//span[contains(text(),'Human Resources')]")).getText() == "Human Resources")
    assert(await driver.findElement(By.xpath("//span[contains(text(),'Employee Health & Safety')]")).getText() == "Employee Health & Safety")
  })
})
