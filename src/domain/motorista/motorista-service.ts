import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

import { Parametros } from "../util/parametros";
import { Motorista } from "./motorista";

@Injectable()
export class MotoristaService{

    private _motorista: Motorista;

    constructor(private _http: Http){    
    }

    get Motorista(){
        return this._motorista;
    }

    //** TEMPORARIO - Ajustar método de login */
    public logaMotorista(idMotorista: number){
        return this._getMotorista(idMotorista)
            .then((data) => {
                this._motorista = data;
                return this._motorista;
            })
    }

    private _getMotorista(idMotorista: number){

        let api = Parametros.baseUri() + `api/motorista/${idMotorista}`;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .get(api, { headers: headers })
            .map(res => res.json())
            .toPromise()
    }

    atualizaPosicaoMotorista(latitude: number, longitude: number){
        
        if ( this._motorista != null
            && (this._motorista.posicao_latitude != latitude
            || this._motorista.posicao_longitude != longitude)){

            this._motorista.posicao_latitude = latitude;
            this._motorista.posicao_longitude = longitude;
            this.atualizaMotorista(this._motorista);
        }
    }

    atualizaMotorista(motorista: Motorista){

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
          
        let api = Parametros.baseUri() + `api/motorista/${motorista.Usuario.idUsuario}`;

        return this._http
            .put(api, JSON.stringify(motorista), { headers: headers })
            .toPromise();
    }
}