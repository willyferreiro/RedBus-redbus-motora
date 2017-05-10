import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

import { Parametros } from "../util/parametros";
import { Motorista } from "./motorista";
import { Usuario } from "../usuario/usuario";

@Injectable()
export class MotoristaService{

    constructor(private _http: Http){}

    getMotorista(idMotorista: number){

        let api = Parametros.baseUri() + `api/motorista/${idMotorista}`;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .get(api, { headers: headers })
            .map(res => res.json())
            .toPromise()
            .then(dado => {
                let motorista = new Motorista(
                    new Usuario(
                        dado.Usuario.idUsuario,
                        dado.Usuario.telefone,
                        dado.Usuario.nome,
                        dado.Usuario.tipoUsuario,
                        dado.Usuario.senha
                    ),
                    dado.emViagem,
                    dado.posicao_latitude,
                    dado.posicao_longitude,
                    dado.foto
                )
                return motorista;   
            });
            
    }

    atualizaMotorista(motorista: Motorista){

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
          
        let api = Parametros.baseUri() + `api/motorista/${motorista.Usuario.idUsuario}`;

        return this._http
            .put(api, JSON.stringify(motorista), { headers: headers })
            .map(res => res.json())
    }
}