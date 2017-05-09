import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

import { Parametros } from "../util/parametros";
import { Motorista } from "./motorista";

@Injectable()
export class MotoristaService{

    constructor(private _http: Http){}

    atualizaMotorista(motorista: Motorista){

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
          
        let api = Parametros.baseUri() + `api/motorista/${motorista.Usuario.idUsuario}`;

        return this._http
            .put(api, JSON.stringify(motorista), { headers: headers })
            .map(res => res.json())
    }
}