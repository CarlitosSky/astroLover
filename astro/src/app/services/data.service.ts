import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  APODAPI, Articles, Astronauts, Astronomers,
  Cultures,
  Galaxias, Galleries,
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

  getGalaxias():Observable<Galaxias[]> {
    return this.http.get<{data: Galaxias[]}>(environment.api_survived+'galaxies/').pipe(
      map(response => response.data))
  }

  getGalaxiesById(id:string):Observable<Galaxias> {
    return this.http.get<{data: Galaxias}>(environment.api_survived+'galaxies/one/'+id).pipe(
      map(response => response.data))
  }


  getPlanets():Observable<Planets[]> {
    return this.http.get<{data: Planets[]}>(environment.api_survived+'planets/').pipe(
      map(response => response.data))
  }

  getPlanetsById(id:string):Observable<Planets> {
    return this.http.get<{data: Planets}>(environment.api_survived+'planets/one/'+id).pipe(
      map(response => response.data))
  }

  getCultures():Observable<Cultures[]> {
    return this.http.get<{data: Cultures[]}>(environment.api_survived+'cultures/').pipe(
      map(response => response.data))
  }

  getCulturesById(id:string):Observable<Cultures> {
    return this.http.get<{data: Cultures}>(environment.api_survived+'cultures/one/'+id).pipe(
      map(response => response.data))
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

  getArticleByCategory(cat:string):Observable<Articles[]> {
    return this.http.get<{status:string, data: Articles[]}>(environment.api_survived+'articles/categorieprov/'+cat).pipe(map(response => response.data))
  }

  getArticleByCategoryById(id:string):Observable<Articles> {
    return this.http.get<{status:string, data: Articles}>(environment.api_survived+'articles/one/'+id).pipe(map(response => response.data))
  }

  getOrderByPriceAsc(cat:string):Observable<Articles[]>{
    return this.http.get<{status:string, data: Articles[]}>(environment.api_survived+'articles/price/asc/'+cat).pipe(map(response => response.data))
  }

  getOrderByPriceDesc(cat:string):Observable<Articles[]>{
    return this.http.get<{status:string, data: Articles[]}>(environment.api_survived+'articles/price/desc/'+cat).pipe(map(response => response.data))
  }

  getSearch(query:string, cate:string):Observable<Articles[]> {
    return this.http.get<{status:string, data:Articles[]}>(environment.api_survived+'articles/search/'+cate+'?query='+query).pipe(map(response => response.data))
  }

  //Gallery

  getGalleriesAll():Observable<Galleries[]> {
    return this.http.get<{data:Galleries[]}>(environment.api_survived+'gallery').pipe(map(response => response.data))
  }

  getGalleriesByIdFirebase(id:string):Observable<Galleries[]> {
    return this.http.get<{status: string,count:number ,data:Galleries[]}>(environment.api_survived+'gallery/user/'+id).pipe(map(response => response.data))
  }

  getGallerieOne(id:string):Observable<Galleries> {
    return this.http.get<{status:string,data:Galleries}>(environment.api_survived+'gallery/one/'+id).pipe(map(response => response.data))
  }

  getGallerieSearch(query:string):Observable<Galleries[]> {
    return this.http.get<{status:string,data:Galleries[]}>(environment.api_survived+'gallery/search?query='+query).pipe(map(response => response.data))
  }

  getGallerieHastags():Observable<Galleries[]> {
    return this.http.get<{status:string,data:Galleries[]}>(environment.api_survived+'gallery/hastags').pipe(map(response => response.data))
  }

  getGallerieHastagsOne(hastag:string):Observable<Galleries[]> {
    return this.http.get<{status:string,data:Galleries[]}>(environment.api_survived+'gallery/hastags/'+hastag).pipe(map(response => response.data))
  }

  updateGallery(gallery : Galleries):Observable<Galleries> {
    return this.http.put<{status:string, data: Galleries}>(environment.api_survived+'gallery/'+gallery._id, gallery).pipe(map(response => response.data))
  }

  addGallery(gallery:Galleries):Observable<Galleries> {
    return this.http.post<Galleries>(environment.api_survived+'gallery',gallery)
  }

  deleteGallery(_id:string):Observable<Galleries>{
    return this.http.delete<Galleries>(environment.api_survived+'gallery/'+_id)
  }










}
