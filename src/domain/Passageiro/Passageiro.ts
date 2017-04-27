import { Coordenada } from "../Geolocation/Coordenada";

export class Passageiro{

    constructor(
        public nome: string,
        public foto: string,
        public embarcado: boolean = false,
        public coordenada: Coordenada = null)
    {}

}