import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import { Passageiro } from "./passageiro";
import { Parametros } from "../util/parametros";

@Injectable()
export class PassageiroService{

    constructor(private _http: Http) {}

    //listaPassageiros():  Observable<Passageiro[]> {
    listaPassageiros() {
        
        //* Buscar dados do motorista
        let api = Parametros.baseUri() + `api/passageiros/${1}`;
        
        let passageiros: Passageiro[] = []; 

        this._http
            .get(api)
            .map(res => res.json())
            .subscribe(
                data => {
                    console.log(data);
                    
                    data.forEach(passageiro => {
                        passageiros.push(new Passageiro (
                            passageiro.id,
                            passageiro.idResponsavel,
                            passageiro.idMotorista,
                            passageiro.nome,
                            passageiro.emViagem,
                            passageiro.embarcado,
                            passageiro.enderecoCasa,
                            passageiro.enderecoEscola,
                            passageiro.foto,
                            passageiro.fotoCompleta,
                            passageiro.posicao_latitude, 
                            passageiro.posicao_longitude
                        ))
                    }); 

                },
                err => console.log(err),
                () => console.log('get actual visits complete')
            );
            
        return passageiros;
    }
}