import { AfterViewInit, Component, NgZone } from '@angular/core';
import { PopupsService } from './services/popups/popups.service';
import { codePush, InstallMode } from 'capacitor-codepush';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {

  progress = 100;

  constructor(
    private zone: NgZone,
    private popups: PopupsService,
    private platform: Platform
  ) {
    this.popups.lockPotrait();
  }

  ngAfterViewInit(): void {
    if (this.platform.is('hybrid')) {
      console.log('check for update');
      this.checkUpdate();
    }
  }

  checkUpdate() {
    codePush.sync({
      installMode: InstallMode.ON_NEXT_RESTART,
      minimumBackgroundDuration: 3,
      updateDialog: {
        appendReleaseDescription: false,
        descriptionPrefix: 'New application update available',
        mandatoryContinueButtonLabel: 'Update immediately',
        mandatoryUpdateMessage: 'Please update to new version to continue using this application',
        optionalIgnoreButtonLabel: 'Not now',
        optionalInstallButtonLabel: 'Install',
        optionalUpdateMessage: 'Do you want to update to this release now?',
        updateTitle: 'New version detected'
      },
      onSyncStatusChanged: async (e) => {
        console.log(e);
        
        switch (e) {
          case 0:
            await this.popups.createToast({ message: 'The app is already the latest version' });
            break;
          case 1:
            await this.popups
              .createAlert({
                header: 'Update is ready',
                message: 'Restart and update the app now?',
                backdropDismiss: false,
                mode: 'ios',
                buttons: [{
                  text: 'Restart',
                  handler: async () => {
                    await codePush.restartApplication();
                  },
                }, {
                  text: 'Cancel',
                  role: 'cancel'
                }]
              });
            break;
          case 2:
            await this.popups.createToast({ message: 'This update has been ignored' });
            break;
          case 4:
            await this.popups.createToast({ message: 'Background update in progress...' });
            break;
          case 7:
            await this.popups.createToast({ message: 'Downloading update package...' });
            break;
          case 8:
            await this.popups.createToast({ message: 'Update package download complete' });
            break;

          default:
            break;
        }
      },
    }, (e) => {
      this.zone.run(() => {
        this.progress = (e.receivedBytes / e.totalBytes) * 100;
      });
    }).then((syncStatus) => console.log(syncStatus));
  }

}
