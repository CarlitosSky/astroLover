import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonButton,
  IonButtons, IonCheckbox,
  IonCol,
  IonContent, IonGrid,
  IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonRow, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Route, Router, RouterLink} from "@angular/router";
import {ToastService} from "../../services/toast.service";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonAvatar, IonButton, IonButtons, IonCol, IonGrid, IonImg, IonRow, IonText, RouterLink, IonItem, IonLabel, IonInput, IonCheckbox, IonList]
})
export class RegisterPage implements OnInit {

private readonly router:Router = inject(Router)
  private readonly toastService:ToastService = inject(ToastService)
  oAuth = getAuth();
  account = {} as any

  gCheck: boolean = false;
  gPassword: string = ""
  gRepeat:string = ""
  gUser:string = ""

  constructor() { }

  ngOnInit() {
  }

  register() {

    if (this.gUser == "" ){
      this.toastService.loadToast("user required", 2000, 'danger')
    }else  if (this.gRepeat != this.account.Password) {
      this.toastService.loadToast("Password don't match", 2000, 'danger')
    }else if (this.gCheck == false) {
      this.toastService.loadToast("privacy policies are mandatory", 2000, 'danger')
    } else {

    createUserWithEmailAndPassword(this.oAuth,this.account.Email, this.account.Password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        this.router.navigateByUrl("/tabs/weather")
        this.toastService.loadToast("User created succesfully", 2000, 'success')
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        this.toastService.loadToast(errorMessage, 2000, 'danger')
      });
    }

  }
}
