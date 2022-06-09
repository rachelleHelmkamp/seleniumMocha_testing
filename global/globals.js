 class globals
 {
    static GetEnvironmentVariables(env)
    {
        let variables = {}
        switch (env)
        {
            case 'QA':
                variables = ['Pepcusqa@23', 'https://apps.qa01.trustmineral-staging.com/'];
                break;
            case 'Alpha':
                variables = ['Pepcusqa@23', 'https://apps.alpha01.trustmineral-staging.com/'];
                break;
            default: 
                console.log("No valid environment set.");
        }

        return variables;
    }
 } 

module.exports = globals