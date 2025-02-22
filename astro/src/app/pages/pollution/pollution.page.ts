import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {HeaderComponent} from "../../component/header/header.component";

@Component({
  selector: 'app-pollution',
  templateUrl: './pollution.page.html',
  styleUrls: ['./pollution.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent]
})
export class PollutionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
