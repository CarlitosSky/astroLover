import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBadge,
  IonCard, IonCardContent, IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonList,
  IonRow, IonSearchbar, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {HeaderComponent} from "../../component/header/header.component";
import {DataService} from "../../services/data.service";
import {Ciudade, Provincia} from "../../common/weatherApp";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import index from "eslint-plugin-jsdoc";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-weather',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, IonList, IonItem, IonGrid, IonRow, IonCol, IonSearchbar, IonCard, IonCardContent, IonCardHeader, IonBadge, RouterLink, IonText]
})
export class NewsPage implements OnInit {

  private readonly data: DataService = inject(DataService)

  constructor() { }

  arrayCityWeather: Ciudade [] = []
  arrayProvinciaWeather: Provincia [] = []
  filteredProvinciaWeather: Provincia[] = []; // Lista filtrada por el searchbar
  searchText: string = '';  // Valor de búsqueda

  ngOnInit() {
    this.loadProvinciaWeather()
  }

  private loadWeather() {
    this.data.getWeather().subscribe({
      next: value => {
        this.arrayCityWeather = value.ciudades
        this.arrayProvinciaWeather = value.provincias
        console.log(value)
      },error:err => console.error(err),
      complete: () => console.log('complete')
    })
  }


  // Cargar los datos de las provincias
  loadProvinciaWeather() {
    this.data.getWeather().subscribe(value => {
      this.arrayProvinciaWeather = value.provincias;
      this.filteredProvinciaWeather = value.provincias;  // Inicializamos la lista filtrada con todos los elementos
    });
  }

  // Método para filtrar los datos según el texto de búsqueda
  filterProvincias(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    // Filtrar por el nombre de la provincia o la comunidad autónoma
    this.filteredProvinciaWeather = this.arrayProvinciaWeather.filter(provincia =>
      provincia.CAPITAL_PROVINCIA.toLowerCase().includes(searchTerm) ||
      provincia.COMUNIDAD_CIUDAD_AUTONOMA.toLowerCase().includes(searchTerm)
    );
}
}
