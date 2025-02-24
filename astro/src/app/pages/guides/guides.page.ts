import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonButton, IonCol, IonContent, IonHeader, IonRow, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {HeaderComponent} from "../../component/header/header.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-guides',
  templateUrl: './guides.page.html',
  styleUrls: ['./guides.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, IonRow, IonCol, IonButton, RouterLink]
})
export class GuidesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
