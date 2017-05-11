import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { PassageirosPage } from '../passageiros/passageiros';
import { Motorista } from "../../domain/motorista/motorista";
import { PosicaoGlobalService } from "../../domain/posicaoglobal/posicaoglobal-service";
import { ViagemService } from "../../domain/viagem/viagem-service";
import { Viagem } from "../../domain/viagem/viagem";
import { ViagemFilho } from "../../domain/viagem/viagem-filho";

@Component({
    selector: 'page-viagem',
    templateUrl: 'viagem.html'
})
export class ViagemPage {

    private _viagemPassageiroDesembarcados: ViagemFilho[] = [];
    private _viagemPassageiroEmbarcados: ViagemFilho[] = [];
    private _viagemPassageiroEntregues: ViagemFilho[] = [];
    private _motorista: Motorista;
    private _viagem: Viagem;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private _posicaoGlobalService: PosicaoGlobalService,
        private _viagemService: ViagemService,
        private _alertCtrl: AlertController){

        this._viagem = navParams.get('Viagem');
        this._viagem.ViagemFilho.forEach((viagemfilho) => {
            this._viagemPassageiroDesembarcados.push(viagemfilho);
        });
        
        this._motorista = navParams.get('motorista');
    }

    get viagemPassageirosDesembarcados(){
        return this._viagemPassageiroDesembarcados;
    }

    get viagemPassageirosEmbarcados(){
        return this._viagemPassageiroEmbarcados;
    }

    get viagemPassageirosEntregues(){
        return this._viagemPassageiroEntregues;
    }

    embarca(viagemPassageiro: ViagemFilho){
     
        viagemPassageiro.posicaoEmbarque_latitude = this._posicaoGlobalService.posicaoGlobal.latitude;
        viagemPassageiro.posicaoEmbarque_longitude = this._posicaoGlobalService.posicaoGlobal.longitude;
        viagemPassageiro.Filho.embarcado = true;

        this._viagemService.atualizaViagemPassageiro(viagemPassageiro)
            .then(() => {
                 //** Emitir aviso mãe
                 this._viagemPassageiroDesembarcados.splice(
                    this._viagemPassageiroDesembarcados.indexOf(viagemPassageiro), 1
                );
                this._viagemPassageiroEmbarcados.push(viagemPassageiro);
            })
    }
    
    desembarca(viagemPassageiro: ViagemFilho){

        this._viagemPassageiroEmbarcados.splice(
            this._viagemPassageiroEmbarcados.indexOf(viagemPassageiro), 1
        );

        viagemPassageiro.posicaoDesembarque_latitude = this._posicaoGlobalService.posicaoGlobal.latitude;
        viagemPassageiro.posicaoDesembarque_longitude = this._posicaoGlobalService.posicaoGlobal.longitude;
        viagemPassageiro.Filho.embarcado = false;
        viagemPassageiro.Filho.emViagem = false;
        //**Consistir viagemPassageiro */
        //** Emitir aviso mãe
        
        this._viagemPassageiroEntregues.push(viagemPassageiro);
    }

    finaliza(){

        if (this._viagemPassageiroEmbarcados.length > 0){
            this._alertCtrl.create({
                title: 'Aviso Viagem',
                subTitle: "Ainda existem viagemPassageiros embarcados. Deseja encerrar mesmo assim?",
                buttons:[
                    { text: 'Cancelar'},
                    { text: 'Confirmar', handler: () => this._confirmaFinalizacao() }]
            }).present();
        }
        else
            this._confirmaFinalizacao();
    }

    private _confirmaFinalizacao(){
        //** Atualiza a lista de filhos embarcados, considerando posição atual do motorista
        this._viagemPassageiroEmbarcados.forEach(viagemPassageiro => {
            viagemPassageiro.posicaoDesembarque_latitude = this._posicaoGlobalService.posicaoGlobal.latitude;
            viagemPassageiro.posicaoDesembarque_longitude = this._posicaoGlobalService.posicaoGlobal.longitude;
            viagemPassageiro.Filho.emViagem = false;
            viagemPassageiro.Filho.embarcado = false;

            this._viagemPassageiroEntregues.push(viagemPassageiro);
        })
        this.navCtrl.setRoot(PassageirosPage);
    }
}
