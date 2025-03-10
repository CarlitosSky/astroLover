import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonImg,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem,
    IonList,
    IonRow,
    IonSearchbar,
    IonSelect,
    IonSelectOption, IonText,
    IonTitle,
    IonToolbar
} from '@ionic/angular/standalone';
import {HeaderComponent} from "../../component/header/header.component";
import {DataService} from "../../services/data.service";
import {LoadingController} from "@ionic/angular";
import {Articles} from "../../common/weatherApp";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, IonCard, IonCardContent, IonCardHeader, IonCol, IonGrid, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonList, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonText, RouterLink]
})
export class CameraPage implements OnInit {

  private readonly data: DataService = inject(DataService)
  private readonly loadingCtrl = inject(LoadingController)

  cameras: Articles[] = []
  visibleCameras: Articles[] = []
  private url: string = "camera"
  gSelected: string = "";

  public buscarResultados: Articles[] = [];
  public buscarQuery: string = '';

  constructor() {
  }

  ngOnInit() {
    this.loadCameras()
  }

  private async loadCameras() {

    const loading = await this.loadingCtrl.create({
      message: 'Loading more...',
      spinner: 'bubbles'
    })

    loading.present()

    this.data.getArticleByCategory(this.url).subscribe({
      next: value => {
        this.cameras = value
        this.visibleCameras = this.cameras.splice(0,4)
        loading.dismiss()
      }, error: err => console.error(err), complete: () => console.log('Complete')
    })
  }

  async changeFilter(event: any) {

    console.log(this.gSelected)

    if (this.gSelected == 'asc') {

      this.cameras = []

      const loading = await this.loadingCtrl.create({
        message: 'Loading more...',
        spinner: "bubbles"
      })

      loading.present()

      this.data.getOrderByPriceAsc('Camera').subscribe({
        next: value => {
          this.cameras = value
          loading.dismiss()
        }, error: err => console.error(err), complete: () => console.log('Complete')
      });
    }

    if (this.gSelected == 'desc') {

      this.cameras = []

      const loading = await this.loadingCtrl.create({
        message: 'Loading more...',
        spinner: "bubbles"
      })

      loading.present()

      this.data.getOrderByPriceDesc('Camera').subscribe({
        next: value => {
          this.cameras = value
          loading.dismiss()
        }, error: err => console.error(err), complete: () => console.log('Completeee')
      });
    }
  }

  search(event: any) {

    const resultado = event.target.value;
    this.buscarQuery = resultado

    this.data.getSearch(resultado,"Camera").subscribe({
      next: value => {
        this.buscarResultados = value
        console.log(value)
        this.cameras = value
      }, error: err => console.error('error'),
      complete: () => console.log('completado sinopsis')
    })
  }

  loadData(event: any) {

    console.log('infinite')

    setTimeout(() => {
      event.target.complete()
      if (this.cameras.length <=4) {
        this.visibleCameras.push(...this.cameras)
        event.target.disabled = true
      }else {
        this.visibleCameras.push(...this.cameras.splice(0,4))
      }
    },1000)

  }
}
