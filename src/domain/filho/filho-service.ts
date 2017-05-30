import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

import { Filho } from "./filho";
import { FilhoDTO } from "./filho-dto";
import { Parametros } from "../util/parametros";
import { Observable } from "rxjs/Observable";

@Injectable()
export class FilhoService{

    constructor(private _http: Http) {}

    listaPassageiros(idMotorista: number): Observable<Filho[]> {
        
        //* Buscar dados do motorista
        let headers = new Headers({'Content-Type': 'application/json'});
        let api = Parametros.baseUri() + `api/passageiros/${idMotorista}`;
        
        return this._http
            .get(api, { headers: headers })
            .map(res => res.json())
    }

    atualizaPassageiros(filho: Filho){

        let headers = new Headers({'Content-Type': 'application/json'});
        let api = Parametros.baseUri() + `api/filho/${filho.idFilho}`;

        return this._http
            .put(api, JSON.stringify(filho), { headers: headers })
            .map(res => res.json())
    }

    salvaPassageiro(filho: FilhoDTO){

        let headers = new Headers({'Content-Type': 'application/json'});
        let api = Parametros.baseUri() + "api/passageiro";

        return this._http
            .post(api, filho, { headers: headers })
            .map(res => res.json())
    }
}