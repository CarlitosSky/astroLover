export interface Welcome {
  origen: Origen;
  title: string;
  ciudades: Ciudade[];
  today: Today;
  tomorrow: Today;
  provincias: Provincia[];
  breadcrumb: any[];
  metadescripcion: string;
  keywords: string;
}

export interface Ciudade {
  id: string;
  idProvince: string;
  name: string;
  nameProvince: string;
  stateSky: StateSky;
  temperatures: Temperatures;
  provincia: Provincia[];
}

export interface StateSky {
  description: string;
  id: string;
}

export interface Temperatures {
  max: string;
  min: string;
}

export interface Origen {
  productor: string;
  web: string;
  language: string;
  copyright: string;
  nota_legal: string;
  descripcion: string;
}

export interface Provincia {
  CODPROV: string;
  NOMBRE_PROVINCIA: string;
  CODAUTON: string;
  COMUNIDAD_CIUDAD_AUTONOMA: string;
  CAPITAL_PROVINCIA: string;
  // ciudad: Ciudade[];
}

export interface Today {
  p: string[];
}

export interface APODAPI {
  date: Date;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

export interface RoverPhotos {
  photos: Photo[];
}

export interface Photo {
  id: number;
  sol: number;
  camera: Camera;
  img_src: string;
  earth_date: Date;
  rover: Rover;
}

export interface Camera {
  id: number;
  name: CameraName;
  rover_id: number;
  full_name: FullName;
}

export enum FullName {
  ChemistryAndCameraComplex = "Chemistry and Camera Complex",
  FrontHazardAvoidanceCamera = "Front Hazard Avoidance Camera",
  MastCamera = "Mast Camera",
  NavigationCamera = "Navigation Camera",
  RearHazardAvoidanceCamera = "Rear Hazard Avoidance Camera",
}

export enum CameraName {
  Chemcam = "CHEMCAM",
  Fhaz = "FHAZ",
  Mast = "MAST",
  Navcam = "NAVCAM",
  Rhaz = "RHAZ",
}

export interface Rover {
  id: number;
  name: RoverName;
  landing_date: Date;
  launch_date: Date;
  status: Status;
}

export enum RoverName {
  Curiosity = "Curiosity",
}

export enum Status {
  Active = "active",
}

export interface Galaxias {
  _id: string;
  name: string;
  description: string;
  photo: string;
}

export interface Planets {
  _id: string;
  name: string;
  description: string;
  photo: string;
}

export interface Cultures {
  _id:string;
  name: string;
  description: string;
  photo: string;
}

export interface SurvivedTime {

  _id:string
  name:string
  photo:string
  time:string
  description:string

}

export interface Astronauts {
  _id:string
  name:string
  photo:string
  description:string
}

export interface Astronomers {
  _id:string
  name:string
  photo:string
  nationality:string
  description:string
}

export interface Articles {

  _id:string
  name: string
  photos:string[]
  price: number
  brand:string
  type:string
  model:string
  category:string
  description:string

}

export interface Galleries {

  _id?:string
  name:string
  photos: string[]
  hastag:string[]
  description:string
  site:string
  idFirebase:string

}



