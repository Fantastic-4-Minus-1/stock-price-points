######## SOME INITIAL SETUP ##########

  ## Setup Airbnb style guide, look at .eslintrc for additional config
  --> npx install-peerdeps --dev eslint-config-airbnb

  ## Setup Jest -- the test runner, assertion library, and mocking library
  --> npm install --save-dev jest // npm install --save-dev jest babel-jest
  ==> Create a test file using 'nameOfFile.test.js'

  ## Setup Enzyme --  provides additional testing utilities to interact with elements
  --> npm install --save-dev enzyme enzyme-adapter-react-16 enzyme-to-json

  ## Make Changes to package.json:
  <!-- enzyme-to-json provides a better component format for snapshot comparison than Enzyme’s internal component representation. snapshotSerializers allows you to minimise code duplication when working with snapshots. -->
  "jest": {
    "snapshotSerializers": ["enzyme-to-json/serializer"]
  }

  continue @ "Creating a test file": https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675

######## NOTES DURING DEVELOPMENT ##########
  ## Resolved issue 'Unexpected use of file extension "jsx"' with adding the following rule in .eslintrc:
    rules : {
      "import/extensions": ["error", "never", { "jsx": "always" }]
    }
  ## Resolved issue: "'describe' is not defined."
    "env": {
      "jest": true
    }