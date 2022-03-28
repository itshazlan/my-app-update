import { Injectable } from '@angular/core';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import {
  AlertController,
  AlertOptions,
  LoadingController,
  LoadingOptions,
  Platform,
  ToastController,
  ToastOptions
} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PopupsService {

  constructor(
    private platform: Platform,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private screenOrientation: ScreenOrientation
  ) { }

  async createAlert(options: AlertOptions) {
    const alert = await this.alertController.create(options);
    alert.present();

    return alert;
  }

  async createLoader(options: LoadingOptions) {
    const loader = await this.loadingController.create(options);
    loader.present();

    return loader;
  }

  async createToast(options: ToastOptions) {
    const toast = await this.toastController.create(options);
    toast.present();

    return toast;
  }

  async lockPotrait() {
    await this.platform.ready();

    if (this.platform.is('capacitor')) {
      return this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
    }
  }
}
