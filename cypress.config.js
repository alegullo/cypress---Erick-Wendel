const { defineConfig } = require('cypress');

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 5000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://erickwendel.github.io/vanilla-js-web-app-example/",

    //nao vai limpar a tela apos cada teste
    testIsolation: false,
  },
});