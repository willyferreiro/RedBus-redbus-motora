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
        
        console.log(JSON.stringify(viagem));

        var obj = `{"idMotorista":${viagem.idMotorista},"posicaoInicio_latitude":${viagem.posicaoInicio_latitude},"posicaoInicio_longitude":${viagem.posicaoInicio_longitude},"statusViagem":${viagem.statusViagem},"Viagem_Filho":${JSON.stringify(viagem.Viagem_Filho)}}`;

        return this._http
            .post(api, obj, { headers: headers })
            .map(res => res.json())
            .toPromise();
    }
}