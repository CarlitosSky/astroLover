import {Component, inject, OnInit} from '@angular/core';
import {IonApp, IonRouterOutlet} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {
  add,
  arrowBack,
  bulb,
  camera,
  create,
  eye,
  footsteps,
  images,
  map,
  person,
  rainy,
  reader,
  trash
} from "ionicons/icons";
import {MenuComponent} from "./component/menu/menu.component";
import {register} from "swiper/element/bundle";
import {ThemeServiceService} from "./services/theme-service.service";
import {initializeApp} from "firebase/app";
import {doc, getDoc, getFirestore} from "firebase/firestore";
import {getAuth, onAuthStateChanged, User} from "firebase/auth";
import {environment} from "../environments/environment";
import {LoadingController} from "@ionic/angular";
import {
  AdMob,
  AdMobBannerSize,
  BannerAdOptions,
  BannerAdPluginEvents,
  BannerAdPosition,
  BannerAdSize
} from "@capacitor-community/admob";

register()

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, MenuComponent],
})
export class AppComponent implements OnInit {

  private readonly loadingCtrl: LoadingController = inject(LoadingController)
  private readonly theme: ThemeServiceService = inject(ThemeServiceService)
  app = initializeApp(environment.firebase);

  private auth = getAuth();
  currentUser: User | null = null;
  gSelected: string = 'light'

  db = getFirestore();


  constructor() {
    addIcons({rainy, footsteps, person, map, camera, reader, add, arrowBack, trash, create, eye, bulb,images})
  }

  async ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.currentUser = user;
        await this.loadUserProfile(user.uid);
      } else {

      }

     await AdMob.removeBanner()
     await this.showBanner()

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


  async initialize() {
    const {status} = await AdMob.trackingAuthorizationStatus();
    if (status === 'notDetermined') {
      await AdMob.requestTrackingAuthorization();
    }
    await AdMob.initialize()
  }

  async showBanner(){
    await this.initialize()

    const options: BannerAdOptions = {
      adId: 'ca-app-pub-2936305412469668/4245123490',
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      isTesting: true,
      npa: false
    }
    await AdMob.showBanner(options)

    AdMob.addListener(BannerAdPluginEvents.SizeChanged, (info: AdMobBannerSize) => {
      document.documentElement.style.setProperty('--banner-height',`${info.height}px`)
    })
  }
}
