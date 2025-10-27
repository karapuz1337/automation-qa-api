/** @type {import('jest').Config} */
const config = {
  verbose: true,
  injectGlobals: false,
  testTimeout: 30000,
  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        pageTitle: "QA Auto API Test Report",
        outputPath: "test-report.html",
        includeFailureMsg: true,
        includeConsoleLog: true,
        theme: "darkTheme",
        sort: "status"
      }
    ]
  ]
};

export default config;