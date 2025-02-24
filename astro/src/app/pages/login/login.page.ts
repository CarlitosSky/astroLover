import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonButton, IonButtons, IonCheckbox, IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg, IonInput, IonItem, IonList, IonRow, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router, RouterLink} from "@angular/router";
import {ToastService} from "../../services/toast.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import {environment} from "../../../environments/environment";
import {signInWithEmailAndPassword} from "@angular/fire/auth";
import {HeaderComponent} from "../../component/header/header.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonButton, IonAvatar, IonGrid, IonRow, IonCol, IonButtons, IonText, RouterLink, IonInput, IonItem, IonList, IonCheckbox, HeaderComponent]
})
export class LoginPage implements OnInit {

  private readonly toastService:ToastService = inject(ToastService)
  private readonly router:Router = inject(Router)

  // Initialize Firebase
   oApp = initializeApp(environment.firebase);

  // Initialize Firebase Authentication and get a reference to the service
   oAuth = getAuth(this.oApp);

  currentUser: any = null;
  userId: string = '';

  gEmail: string = "";
  gPassword: string = "";

  constructor() { }

  ngOnInit() {
  }

  login() {

    // if (this.gEmail == "" || this.gPassword == ""){
    //   this.toastService.loadToast("Empty fields",2000,'danger')
    // }

    signInWithEmailAndPassword(this.oAuth, this.gEmail, this.gPassword)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user)
        this.toastService.loadToast("Login succesfully", 2000, 'success')
        this.router.navigateByUrl("/tabs/weather")

        // ...
      })
      .catch((error:any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.toastService.loadToast(errorMessage, 2000,'danger')
        // ..
      });

  }
}
