import {inject, Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private readonly toastCtrl:ToastController = inject(ToastController);

  constructor() { }

  async loadToast(message: string, duration: number, color:string) {

    const toast = await this.toastCtrl.create({

      message,
      duration,
      color,
      position: 'bottom'
    });
    await toast.present();

  }

}
