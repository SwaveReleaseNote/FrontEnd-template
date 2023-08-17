import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '8m1oyr',
   e2e: {
      baseUrl: 'http://back-service:3000',
      fixturesFolder: 'src/cypress/fixtures',
      supportFile: 'src/cypress/support/index.js',
      experimentalStudio: true,
   },
});
