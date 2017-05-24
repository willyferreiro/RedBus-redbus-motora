import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { PassageirosPage } from '../passageiros/passageiros';
import { Motorista } from "../../domain/motorista/motorista";
import { PosicaoGlobalService } from "../../domain/posicaoglobal/posicaoglobal-service";
import { ViagemService } from "../../domain/viagem/viagem-service";
import { Viagem } from "../../domain/viagem/viagem";
import { ViagemFilho } from "../../domain/viagem/viagem-filho";
import { AtualizaPassageiroDTO } from "../../domain/viagem/atualiza-passageiro-dto";
import { MotoristaService } from "../../domain/motorista/motorista-service";
import { ViagemDTO } from "../../domain/viagem/viagemdto";

//import { moment } from 'node_modules/moment-timezone';

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
        private _loadingCtrl: LoadingController,
        private _posicaoGlobalService: PosicaoGlobalService,
        private _motoristaService: MotoristaService,
        private _viagemService: ViagemService,
        private _alertCtrl: AlertController){
    }

    ngOnInit() {

        this._viagem = this.navParams.get('Viagem');
        this._viagem.ViagemFilho.forEach((viagemfilho) => {
            this._viagemPassageiroDesembarcados.push(viagemfilho);
        });
        
        this._motorista = this._motoristaService.Motorista;
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
     
        let loader = this._loadingCtrl.create({
            content: 'Atualizando passageiro...'
        });

        loader.present();

        let passageiro = new AtualizaPassageiroDTO(
            viagemPassageiro.idViagem,
            viagemPassageiro.idFilho,
            this._posicaoGlobalService.posicaoGlobal.latitude,
            this._posicaoGlobalService.posicaoGlobal.longitude,
            true
        )
        this._viagemService.atualizaPassageiro(passageiro)
            .then(() => {
                 //** Emitir aviso mãe
                 this._viagemPassageiroDesembarcados.splice(
                    this._viagemPassageiroDesembarcados.indexOf(viagemPassageiro), 1
                );
                
                this._viagemService.getViagemPassageiro(passageiro.idViagem, passageiro.idFilho)
                .subscribe(
                    viagemPassageiroAtualizado => {
                        this._viagemPassageiroEmbarcados.push(viagemPassageiroAtualizado);
                    loader.dismiss(),
                    err => this.mostraMsgErro(err);
                })
            })
            .catch (err => {
                console.log(err);
                loader.dismiss();
            })
    }
    
    desembarca(viagemPassageiro: ViagemFilho){

        let loader = this._loadingCtrl.create({
            content: 'Atualizando passageiro...'
        });

        loader.present();

        let passageiro = new AtualizaPassageiroDTO(
            viagemPassageiro.idViagem,
            viagemPassageiro.idFilho,
            this._posicaoGlobalService.posicaoGlobal.latitude,
            this._posicaoGlobalService.posicaoGlobal.longitude,
            false
        )
        this._viagemService.atualizaPassageiro(passageiro)
            .then(() => {
                 //** Emitir aviso mãe
                 this._viagemPassageiroEmbarcados.splice(
                    this._viagemPassageiroEmbarcados.indexOf(viagemPassageiro), 1
                );
                
                this._viagemService.getViagemPassageiro(passageiro.idViagem, passageiro.idFilho)
                .subscribe(
                    viagemPassageiroAtualizado => {
                        this._viagemPassageiroEntregues.push(viagemPassageiroAtualizado);
                        loader.dismiss();
                    }),
                    err => this.mostraMsgErro(err);
            }).catch (err => {
                console.log(err);
                loader.dismiss();
                this.mostraMsgErro(err);
            })
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
        
        let loader = this._loadingCtrl.create({
            content: 'Finalizando...'
        });

        loader.present();
        
        let filhos: number[] = [];
        this._viagemPassageiroEmbarcados.forEach(viagemPassageiro => {
            filhos.push(viagemPassageiro.idFilho);
        })

        let fimViagem = new ViagemDTO(
            this._viagem.idViagem,
            this._motorista.idUsuario,
            this._posicaoGlobalService.posicaoGlobal.latitude,
            this._posicaoGlobalService.posicaoGlobal.longitude,
            filhos
        )
        
        this._viagemService.finalizaViagem(fimViagem)
        .then(() => {
            loader.dismiss();
            this.navCtrl.setRoot(PassageirosPage);
        })
        .catch (err => {
                loader.dismiss();
                this.mostraMsgErro(err);
            })
    }

    private mostraMsgErro(erro){
        this._alertCtrl.create({
            title: 'Erro',
            subTitle: erro,
            buttons: [{ text: 'Ok'}]
        }).present()
    }
}
