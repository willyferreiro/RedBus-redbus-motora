import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import { Passageiro } from "./passageiro";

@Injectable()
export class PassageiroService{

    constructor(private _http: Http) {}

    listaPassageiros() {
        
        let passageiros: Passageiro[] = []; 

        //obter passageiros disponíveis para o motorista
        
        passageiros.push(new  Passageiro(1, 1,'Mario Bross', 'assets/img/mario.png'));
        passageiros.push(new  Passageiro(2, 2, 'Luigi Silva', 'assets/img/luigi.png'));
        passageiros.push(new  Passageiro(3, 3, 'Yoshi Dino', 'assets/img/Yoshi.png'));
        passageiros.push(new  Passageiro(4, 4, 'Mario Bross', 'assets/img/mario.png'));
        passageiros.push(new  Passageiro(5, 5, 'Luigi Silva', 'assets/img/luigi.png'));
        passageiros.push(new  Passageiro(6, 6, 'Yoshi Dino', 'assets/img/Yoshi.png'));
        passageiros.push(new  Passageiro(7, 7, 'Mario Bross', 'assets/img/mario.png'));
        passageiros.push(new  Passageiro(8, 8, 'Luigi Silva', 'assets/img/luigi.png'));
        passageiros.push(new  Passageiro(9, 9, 'Yoshi Dino', 'assets/img/Yoshi.png'));
        
        return passageiros;
        
    }
}