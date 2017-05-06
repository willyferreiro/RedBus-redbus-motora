import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import { Filho } from "./filho";
import { Parametros } from "../util/parametros";

@Injectable()
export class FilhoService{

    constructor(private _http: Http) {}

    listaPassageiros() {
        
        //* Buscar dados do motorista
        let api = Parametros.baseUri() + `api/passageiros/${1}`;
        
        let passageiros: Filho[] = []; 

        return this._http
            .get(api)
            .map(res => res.json())
            .map(data => {
                console.log(data);
                
                data.forEach(filho => {
                    passageiros.push(new Filho (
                        filho.id,
                        filho.idResponsavel,
                        filho.idMotorista,
                        filho.nome,
                        filho.emViagem,
                        filho.embarcado,
                        filho.enderecoCasa,
                        filho.enderecoEscola,
                        filho.foto,
                        filho.fotoCompleta,
                        filho.posicao_latitude, 
                        filho.posicao_longitude
                    ))
                });
                return passageiros;
            }).toPromise();
    }
}