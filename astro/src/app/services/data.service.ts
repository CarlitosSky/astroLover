import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  APODAPI, Astronauts, Astronomers,
  Cultures,
  Galaxias,
  Planets,
  Provincia,
  RoverPhotos,
  SurvivedTime,
  Welcome
} from "../common/weatherApp";
import {environment} from "../../environments/environment";
import { map } from 'rxjs/operators';

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

  getApodNasa():Observable<APODAPI> {
    return this.http.get<APODAPI>("https://api.nasa.gov/planetary/apod?api_key="+environment.apiKey)
  }

  getRoverPhotos():Observable<RoverPhotos> {
    return this.http.get<RoverPhotos>("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key="+environment.apiKey)
  }

  getGalaxies():Observable<Galaxias[]> {
    return this.http.get<Galaxias[]>('/assets/data/galaxias.json')
  }

  getPlanets():Observable<Planets[]> {
    return this.http.get<Planets[]>('/assets/data/planetas.json')
  }

  getCultures():Observable<Cultures[]> {
    return this.http.get<Cultures[]>('/assets/data/culturas.json')
  }

  getSurvivedTime():Observable<SurvivedTime[]> {
    return this.http.get< {data: SurvivedTime[]}>(environment.api_survived+'survived/').pipe(
      map(response => response.data)
    );
  }

  getSurvivedTimeById(id:string):Observable<SurvivedTime> {
    return this.http.get< {status: string , data: SurvivedTime}>(environment.api_survived+'survived/'+'one/'+id).pipe(
      map(response => response.data)
    );
  }

  getAstronauts():Observable<Astronauts[]> {
    return this.http.get< {data: Astronauts[]}>(environment.api_survived +'astronauts/').pipe(
      map(response => response.data)
    );
  }

  getAstronautsById(id:string):Observable<Astronauts> {
    return this.http.get< {status: string , data: Astronauts}>(environment.api_survived+'astronauts/'+'one/'+id).pipe(
      map(response => response.data)
    );
  }

  getAstronomers():Observable<Astronomers[]> {
    return this.http.get< {data: Astronomers[]}>(environment.api_survived +'astronomers/').pipe(
      map(response => response.data)
    );
  }

  getAstronomersById(id:string):Observable<Astronomers> {
    return this.http.get< {status: string , data: Astronomers}>(environment.api_survived+'astronomers/'+'one/'+id).pipe(
      map(response => response.data)
    );
  }






}
