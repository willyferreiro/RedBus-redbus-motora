import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { PosicaoGlobal } from "./posicaoglobal";

@Injectable()
export class PosicaoGlobalService {

    private _posicaoGlobal: PosicaoGlobal;

    constructor(private _geolocation: Geolocation) {

        this._posicaoGlobal = new PosicaoGlobal();

        var watchOptions = {
            frequency: 5000,
            timeout: 3000,
            enableHighAccuracy: true
        };

        this._geolocation.watchPosition(watchOptions)
            .subscribe(geolocation => {
                
                if (geolocation.coords) {

                    console.log("GPS Update: " +
                        "latitude: " + geolocation.coords.latitude +
                        "longitude: " + geolocation.coords.longitude +
                        "timestamp: " + geolocation.timestamp);

                    this._posicaoGlobal = new PosicaoGlobal(
                        geolocation.coords.latitude,
                        geolocation.coords.longitude,
                        geolocation.timestamp)
                }
            }
            ,((error) => {
                console.log(error);
            }));
    }

    get posicaoGlobal(): PosicaoGlobal {
        return this._posicaoGlobal;
    }
}