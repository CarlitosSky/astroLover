export interface Welcome {
  origen:          Origen;
  title:           string;
  ciudades:        Ciudade[];
  today:           Today;
  tomorrow:        Today;
  provincias:      Provincia[];
  breadcrumb:      any[];
  metadescripcion: string;
  keywords:        string;
}

export interface Ciudade {
  id:           string;
  idProvince:   string;
  name:         string;
  nameProvince: string;
  stateSky:     StateSky;
  temperatures: Temperatures;
  provincia: Provincia[];
}

export interface StateSky {
  description: string;
  id:          string;
}

export interface Temperatures {
  max: string;
  min: string;
}

export interface Origen {
  productor:   string;
  web:         string;
  language:    string;
  copyright:   string;
  nota_legal:  string;
  descripcion: string;
}

export interface Provincia {
  CODPROV:                   string;
  NOMBRE_PROVINCIA:          string;
  CODAUTON:                  string;
  COMUNIDAD_CIUDAD_AUTONOMA: string;
  CAPITAL_PROVINCIA:         string;
  // ciudad: Ciudade[];
}

export interface Today {
  p: string[];
}
