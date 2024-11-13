import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "ntqjkv",

  e2e: {
    baseUrl: "http://localhost:4000",
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
