import { defineConfig } from "cypress";
import * as dotenv from 'dotenv';

dotenv.config();

module.exports = defineConfig({
  env: { ...process.env },
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'https://dev-admin.grace-technology.io/',
    specPattern: 'cypress/e2e/specs/*.spec.ts',
    chromeWebSecurity: false
  },
});
