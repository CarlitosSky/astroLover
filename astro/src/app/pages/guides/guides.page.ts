import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {HeaderComponent} from "../../component/header/header.component";

@Component({
  selector: 'app-guides',
  templateUrl: './guides.page.html',
  styleUrls: ['./guides.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent]
})
export class GuidesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
