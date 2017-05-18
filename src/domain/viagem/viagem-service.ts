import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Parametros } from "../util/parametros";
import { AtualizaPassageiroDTO } from "./atualiza-passageiro-dto";
import { InicioViagemDTO } from "./inicioviagemdto";
import { Viagem } from "./viagem";
import { FimViagemDTO } from "./fimviagemdto";

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

    getViagemPassageiro(idViagem: number, idFilho: number){
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        let api = Parametros.baseUri() + `api/passageiro/${idViagem}/${idFilho}`;

        return this._http
            .get(api, { headers: headers })
            .map(res => res.json())
            .toPromise();
    }

    atualizaPassageiro(passageiro: AtualizaPassageiroDTO){
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
          let api = Parametros.baseUri() + `api/passageiro/${passageiro.idViagem}/${passageiro.idFilho}`;

        return this._http
            .put(api, JSON.stringify(passageiro), { headers: headers })
            .map(res => res.json())
            .toPromise();
    }

    finalizaViagem(fimViagem: FimViagemDTO){
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
          let api = Parametros.baseUri() + `api/viagem/${fimViagem.idViagem}`;

        return this._http
            .put(api, JSON.stringify(fimViagem), { headers: headers })
            .map(res => res.json())
            .toPromise();
    }
}