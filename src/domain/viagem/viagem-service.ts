import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

import { Viagem } from "./viagem";
import { Parametros } from "../util/parametros";
import { ViagemFilho } from "./viagem-filho";
import { InicioViagemDTO } from "./inicioviagemdto";

@Injectable()
export class ViagemService{

    constructor(private _http: Http){}

    iniciaViagem(viagemDTO: InicioViagemDTO){
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        let api = Parametros.baseUri() + "api/viagem";
        
        return this._http
            .post(api, JSON.stringify(viagemDTO), { headers: headers })
            .map(res => res.json())
            .toPromise();
    }

    atualizaViagemPassageiro(viagemFilho: ViagemFilho){
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        console.log(viagemFilho);

        let api = Parametros.baseUri() + `api/viagemFilho/${viagemFilho.idViagem}/${viagemFilho.idFilho}`;

        return this._http
            .put(api, JSON.stringify(viagemFilho), { headers: headers })
            .map(res => res.json())
            .toPromise();
    }
}