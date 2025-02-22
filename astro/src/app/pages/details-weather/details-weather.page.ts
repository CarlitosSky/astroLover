import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonBadge, IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {DataService} from "../../services/data.service";
import {Provincia, Welcome} from "../../common/weatherApp";
import {ActivatedRoute, Router} from "@angular/router";
import {HeaderComponent} from "../../component/header/header.component";

@Component({
  selector: 'app-details-weather',
  templateUrl: './details-weather.page.html',
  styleUrls: ['./details-weather.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, IonText, IonCard, IonCardHeader, IonCardContent, IonBadge, IonBackButton, IonButtons]
})
export class DetailsWeatherPage implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute)
  private readonly data:DataService = inject(DataService)
  provincia!:Welcome

  id = this.route.snapshot.paramMap.get('CODPROV')!;

  constructor() {

  }

  ngOnInit() {
  this.loadPro()
  }

  private loadPro() {

    this.data.getWeatherById(this.id).subscribe({
      next: value => {
        this.provincia = value
        console.log(value)
      },error: err => console.error(err),
      complete: () => {
        console.log('completed')
        console.log(this.provincia)
      }


    })

  }
}
