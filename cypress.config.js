const { defineConfig } = require("cypress");

module.exports = defineConfig({ 
  e2e: {
    env: {
      baseUrl: "https://pet-shop.buckhill.com.hr/",
      adminBaseUrl: "https://pet-shop.buckhill.com.hr"
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
