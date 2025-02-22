import {Component, model, ModelSignal, OnInit} from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonHeader,
  IonImg,
  IonMenuToggle,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {MenuComponent} from "../menu/menu.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonAvatar,
    IonImg,
    IonTitle,
    MenuComponent,
    IonMenuToggle,
    IonButton,
    IonButtons
  ]
})
export class HeaderComponent  implements OnInit {

  constructor() { }

  tittle: ModelSignal<string> = model.required();

  ngOnInit() {}

}
