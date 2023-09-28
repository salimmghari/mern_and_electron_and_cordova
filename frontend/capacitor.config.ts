import {CapacitorConfig} from '@capacitor/cli';


const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'mern_and_electron_and_capacitor',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};


export default config;
