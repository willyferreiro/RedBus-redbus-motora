import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

import { Viagem } from "./viagem";
import { Filho } from "../filho/filho";
import { Motorista } from "../motorista/motorista";
import { Parametros } from "../util/parametros";

@Injectable()
export class ViagemService{

    constructor(private _http: Http){}

    iniciaViagem(viagem){
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        let api = Parametros.baseUri() + `api/viagem/${viagem}`;

        return this._http
            .post(api, JSON.stringify(viagem), { headers: headers })
            .map(res => res.json())
            .toPromise();
    }
}