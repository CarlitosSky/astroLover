import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'astro',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    // Opcional: Para "live reload" durante el desarrollo
    url: 'http://192.168.1.100:8100', // Usa tu IP local
    cleartext: true
  }
};

export default config;
