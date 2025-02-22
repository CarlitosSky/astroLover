import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Provincia, Welcome} from "../common/weatherApp";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly http:HttpClient = inject(HttpClient)

  constructor() { }

  getWeather():Observable<Welcome> {
    return this.http.get<Welcome>(environment.urlapiWeather)
  }

  getWeatherById(id:string):Observable<Welcome> {
    return this.http.get<Welcome>("https://www.el-tiempo.net/api/json/v2/provincias/"+id)
  }

}
