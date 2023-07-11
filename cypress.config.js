const { defineConfig } = require("cypress");

module.exports = defineConfig({ 
  e2e: {
    env: {
      apiBaseUrl: "https://api.example.com",
      adminBaseUrl: "https://pet-shop.buckhill.com.hr"
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
