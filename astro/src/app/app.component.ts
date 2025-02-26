import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {camera, footsteps, person, rainy, map, reader, add, arrowBack, trash, create, eye} from "ionicons/icons";
import {MenuComponent} from "./component/menu/menu.component";
import {register} from "swiper/element/bundle";
register()

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, MenuComponent],
})
export class AppComponent {
  constructor() {
    addIcons({rainy,footsteps,person,map,camera,reader,add,arrowBack,trash,create,eye})
  }
}
