import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'my-app-update',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    // CapacitorUpdater: {
    //   autoUpdateUrl: 'https://capgo.app/api/latest?appid=6952e803-2972-476c-8418-83cd0f212bbe&channel=dev'
    // },
    CodePush: {
      IOS_DEPLOY_KEY: "4YX4rj_WrNNVAeID-nBvLVehAmKit3SbKzgwt",
      ANDROID_DEPLOY_KEY: "Pv5soFQCGwlVKtj-yz1gkoLoCBOByNUIgIZce",
      SERVER_URL: "https://codepush.appcenter.ms/"
    }
  }
};

export default config;
