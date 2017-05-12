import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

import { Filho } from "./filho";
import { Parametros } from "../util/parametros";

@Injectable()
export class FilhoService{

    constructor(private _http: Http) {}

    listaPassageiros() {
        
        //* Buscar dados do motorista
        let api = Parametros.baseUri() + `api/passageiros/${1}`;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let passageiros: Filho[] = []; 

        return this._http
            .get(api, { headers: headers })
            .map(res => res.json())
            .toPromise();
    }

    atualizaPassageiros(filho: Filho){

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
          
        let api = Parametros.baseUri() + `api/filho/${filho.idFilho}`;

        return this._http
            .put(api, JSON.stringify(filho), { headers: headers })
            .map(res => res.json())
    }
}