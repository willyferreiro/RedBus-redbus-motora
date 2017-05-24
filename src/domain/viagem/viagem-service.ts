import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Parametros } from "../util/parametros";
import { AtualizaPassageiroDTO } from "./atualiza-passageiro-dto";
import { ViagemDTO } from "./viagemdto";
import { ViagemFilho } from "./viagem-filho";

@Injectable()
export class ViagemService {

    constructor(private _http: Http) { }

    iniciaViagem(viagemDTO: ViagemDTO) {

        let headers = new Headers({'Content-Type': 'application/json'});
        let api = Parametros.baseUri() + "api/viagem/iniciaviagem";

        return this._http
            .post(api, viagemDTO, { headers: headers })
            .map(res => res.json())
            .catch(err => err)
    }

    finalizaViagem(fimViagem: ViagemDTO) {

        let headers = new Headers({'Content-Type': 'application/json'});
        let api = Parametros.baseUri() + `api/viagem/finalizaviagem/${fimViagem.idViagem}`;

        return this._http
            .put(api, JSON.stringify(fimViagem), { headers: headers })
            .map(res => res.json())
            .toPromise();
    }

    getViagemPassageiro(idViagem: number, idFilho: number): Observable<ViagemFilho> {

        let headers = new Headers({'Content-Type': 'application/json'});
        let api = Parametros.baseUri() + `api/passageiro/${idViagem}/${idFilho}`;

        return this._http
            .get(api, { headers: headers })
            .map(res => res.json())
            .catch(err => err)
    }

    atualizaPassageiro(passageiro: AtualizaPassageiroDTO) {

        let headers = new Headers({'Content-Type': 'application/json'});
        let api = Parametros.baseUri() + `api/passageiro/${passageiro.idViagem}/${passageiro.idFilho}`;

        return this._http
            .put(api, JSON.stringify(passageiro), { headers: headers })
            .map(res => res.json())
            .toPromise();
    }
}