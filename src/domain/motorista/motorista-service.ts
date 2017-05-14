import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

import { Parametros } from "../util/parametros";
import { Motorista } from "./motorista";
import { Usuario } from "../usuario/usuario";

@Injectable()
export class MotoristaService{

    private _motorista: Motorista;

    constructor(private _http: Http){    
    }

    get Motorista(){
        if (this._motorista != null)
            return this._motorista;
        else
            return
    }

    private _getMotorista(idMotorista: number){

        let api = Parametros.baseUri() + `api/motorista/${idMotorista}`;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .get(api, { headers: headers })
            .map(res => res.json())
            .subscribe((data) => this._motorista = data)
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