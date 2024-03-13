import { defineConfig } from "cypress";
import * as dotenv from 'dotenv';

dotenv.config();

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  video: false,
  reporterOptions: {
    reportDir: "cypress/reports",
    charts: true,
    reportPageTitle: "Grace report",
    embeddedScreenshots: true,
    inlineAssets: true
  },
  env: { ...process.env },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'https://dev-admin.grace-technology.io/',
    specPattern: 'cypress/e2e/specs/*.spec.ts',
    chromeWebSecurity: false
  },
});
