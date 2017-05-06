import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import { Parametros } from "../util/parametros";

@Injectable()
export class MotoristaService{

    constructor(private _http: Http){}

}