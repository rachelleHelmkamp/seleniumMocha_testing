const {By, Key, Builder, WebElementCondition, WebDriver, until, WebElement, ExpectedConditions} = require("selenium-webdriver");
const path = require("path");
const fProcess = require('find-process');
const chrome = require('selenium-webdriver/chrome');
 
 class globals
 {
    static async GetEnvironmentVariables()
    {
        // If the test is NOT run in parallel, what we want is the last item in argv.
        // If the test IS run in parallel, what we want is the cmd to be split by spaces, and the note about the environment is the second to last entry.
        let variables = {}
        let launchArgs;
        let envIndex;

        let runningProcess = await process;
        if (runningProcess.argv.length == 2)
        {
            runningProcess = await fProcess('pid', process.ppid);
            launchArgs = runningProcess[0].cmd.split(' ');
            envIndex = launchArgs.length - 2;
        }
        else
        {
            launchArgs = runningProcess.argv;
            envIndex = launchArgs.length - 2
        }

        // Get the path to the environment config file. 
        let envToLoad = launchArgs[envIndex]

        // Load the values stored in the custom configuration to the process.
        require('dotenv').config({ path: path.resolve(__dirname, envToLoad)});

        // Set variables here, most likely user/environment.
        variables = [process.env.URL, process.env.PASSWORD];

        return variables;
    }

    static async CreateDriver()
    {
        // Create the driver, and Wait for it to build and launch. 
        let driver = await new Builder().forBrowser("chrome").setChromeOptions(new chrome.Options().headless().setPageLoadStrategy("eager")).build();
        //let driver = await new Builder().forBrowser("chrome").setChromeOptions(new chrome.Options().setPageLoadStrategy("eager")).build();

        //driver.manage().setTimeouts({ pageLoad: 180000});

        // Maximize the window.
        await driver.manage().window().maximize();

        return driver;
    }

    static RandomString(length = 5, includeNumerics = true)
    {
        var returnString = [];

        var characterList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        // If the resulting string should not include numbers, remove them.
        if (!includeNumerics)
        {
            characterList.replace('0123456789', '');
        }

        // Get the length of the character list, for use in the randomizing.
        var characterListLength = characterList.length;

        // Create a random string, of the appropriate length.
        for (var i = 0; i < length; i++)
        {
            returnString.push(characterList.charAt(Math.floor(Math.random() * characterListLength)));
        }

        return returnString.join('');
    }

    static RandomNumber(inclusiveLowerBound, inclusiveUpperBound)
    {
        var retValue = 1;

        inclusiveLowerBound = Math.ceil(inclusiveLowerBound);
        inclusiveUpperBound = Math.floor(inclusiveUpperBound);

        retValue = Math.floor(Math.random() * (inclusiveUpperBound - inclusiveLowerBound + 1) + inclusiveLowerBound);

        return retValue;
    }
 } 

module.exports = globals