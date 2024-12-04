# chipAssessment
This is a project created solely as an assessment for organization CHIP. Here we will automate few happy path and negative scenarios for openweathermap.org application. This project doesn't use any proprietary softwares.

### Author
Suprith Gangawar <suprithguk@gmail.com>

### Pre Requisites
npm\
cypress\
typescript\
cypress-mochawesome-reporter\
API key of the user account on openweathermap.org\
Jenkins configured for CI/CD and nodeJS plugin installed in Jenkins\

### Installation and Usage
Clone the repo: 
$ git clone https://github.com/suprithguk/chipAssessment.git\
$ cd chipAssessment\

$ npm i\
$ npm install typescript --save-dev\
$ npm install cypress --save-dev\
$ npm install cypress-mochawesome-reporter --save-dev\

Create an account on openweathermap.org and after login click on the profile on top right of the application and select 'My API keys'. Provide a name for the key and click on Generate to create a new API key. This will be required as a parameter for interacting with the APIs.\

To run spec files through cypress UI:\
$ npx cypress open\

To run spec files without the cypress UI and directly through command line:\
$ npx cypress run --spec cypress/e2e/weatherApi.cy.ts\

### Important Files/Folders
package.json - Readable information about the project, author, dependencies etc,.

cypress.config.ts - To add cypress specific configurations if any\

Jenkinsfile - To import and run the test cases in Jenkins CI/CD platform. Its just a sample file and not tested. Usually this becomes the entry point to the project.\

support/e2e.ts - To import all required global configuration\

support/commands.ts - Reusable commands to keep test cases short and readable\

support/apiUtils.ts - Reusable utilities to mock server responses\

screenshots/ - To store screenshots taken during the testing\

reports/html/index.html - HTML report to view the status in browser. This is created by cypress-mochawesome-reporter post every run. Overwrites the previous report.\

fixtures/ - Contains files in .csv or .json format to import as test data to later use in your test cases.\

fixtures/products.json - Contains brand, product and category information to search and assert in the browser\

e2e/weatherApi.cy.ts - Test case file for all positive and negative scenarios\

e2e/mockTests.cy.ts - Mock test cases which use the apiTests.ts utils file\
downloads/ - Location to store any downloaded data during your testing\

### Reporting
html reports are generated when you run the spec files through command line at:
chipAssessment/cypress/reports/html/index.html. Additionally, a stage has been added in the Jenkinsfile to inhibit the inbuilt Jenkins HTML publisher plugin to generate a HTML report within Jenkins. We are using mochawesome reporter to generate HTML reports, it can be installed as a node module with the name mentioned in prerequisites above.
