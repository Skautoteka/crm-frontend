import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'apps/e2e/src',
      webServerCommands: {
        default: 'nx run skautoteka-frontend:serve:development',
        production: 'nx run skautoteka-frontend:serve:production'
      },
      ciWebServerCommand: 'nx run skautoteka-frontend:serve-static'
    }),
    supportFile: 'apps/e2e/src/support/e2e.ts',
    baseUrl: 'http://localhost:4200'
  }
});
