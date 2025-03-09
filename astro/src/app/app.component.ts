import {Component, inject, OnInit} from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {camera, footsteps, person, rainy, map, reader, add, arrowBack, trash, create, eye, bulb} from "ionicons/icons";
import {MenuComponent} from "./component/menu/menu.component";
import {register} from "swiper/element/bundle";
import {ThemeServiceService} from "./services/theme-service.service";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {environment} from "../environments/environment";
import {LoadingController} from "@ionic/angular";
register()

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, MenuComponent],
})
export class AppComponent implements OnInit{

  private readonly loadingCtrl:LoadingController = inject(LoadingController)
  private readonly theme:ThemeServiceService = inject(ThemeServiceService)
  app = initializeApp(environment.firebase);

  private auth = getAuth();
  currentUser: User | null = null;
  gSelected:string = 'light'

  db = getFirestore();


  constructor() {
    addIcons({rainy,footsteps,person,map,camera,reader,add,arrowBack,trash,create,eye,bulb})
  }

   async ngOnInit() {
     onAuthStateChanged(this.auth, async (user) => {
       if (user) {
         this.currentUser = user;
         await this.loadUserProfile(user.uid);
       } else {

       }
     });
  }

  async loadUserProfile(uid: string) {

    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles'
    })
    await loading.present()

    const docRef = doc(this.db, "color_mode", uid);
    const docSnap = await getDoc(docRef);

    loading.dismiss()
    if (docSnap.exists()) {
      const data = docSnap.data();
      this.gSelected = data['color'];
      this.theme.setTheme(this.gSelected)
    } else {
    }
  }

}
