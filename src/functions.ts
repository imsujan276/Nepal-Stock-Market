import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController, Platform } from 'ionic-angular';


@Injectable()
export class customFunctions {
    loader: any;
    constructor(private alert: AlertController, private loadingController: LoadingController,
        private toastCtrl: ToastController, public platform: Platform) {
    }

    showAlert(title, text) {
        let alert = this.alert.create({
            title: title,
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    }
    presentLoading(text?: string) {
        let loadingText = "Please wait..."
        if (text) {
            loadingText = text;
        }
        this.loader = this.loadingController.create({
            content: loadingText
        })
        this.loader.present();
    }
    dismissLoading() {
        this.loader.dismiss();
    }

    presentToast(message?, duration?, position?) {
        let toastMessage: string = "Done";
        let toastDuration: number = 3000;
        let toastPosition: string = 'bottom';
        if (message) {
            toastMessage = message;
        }
        if (duration) {
            toastDuration = duration;
        }
        if (position) {
            toastPosition = position;
        }
        let toast = this.toastCtrl.create({
            message: toastMessage,
            duration: toastDuration,
            position: toastPosition
        });

        toast.onDidDismiss(() => {
            //console.log('Dismissed toast');
        });

        toast.present();
    }

    getEncodedFormUrl(toConvert) {
		const formBody = [];
		for (const property in toConvert) {
			const encodedKey = encodeURIComponent(property);
			const encodedValue = encodeURIComponent(toConvert[property]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		return formBody.join('&');
    }
    
    isEmptyObject(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }


}