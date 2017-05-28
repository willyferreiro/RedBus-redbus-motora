import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { ViagemPage } from '../viagem/viagem';
import { Filho } from "../../domain/filho/filho";
import { FilhoService } from "../../domain/filho/filho-service";
import { Motorista } from "../../domain/motorista/motorista";
import { MotoristaService } from "../../domain/motorista/motorista-service";
import { ViagemService } from "../../domain/viagem/viagem-service";
import { PosicaoGlobalService } from "../../domain/posicaoglobal/posicaoglobal-service";
import { ViagemDTO } from "../../domain/viagem/viagemdto";

@Component({
    selector: 'page-passageiros',
    templateUrl: 'passageiros.html'
})
export class PassageirosPage implements OnInit {

    private _motorista: Motorista;
    private _passageiro: Filho[] = [];
    private _passageiroOriginal: Filho[] = []; //guarda lista original para o filtro
    private _passageiroSelecionados: Filho[] = [];
    public desabilitaInicia: Boolean = true;

    constructor(
        public navCtrl: NavController,
        private _posicaoGlobalService: PosicaoGlobalService,
        private _loadingCtrl: LoadingController,
        private _alertCtrl: AlertController,
        private _filhoservice: FilhoService,
        private _viagemservice: ViagemService,
        private _motoristaService: MotoristaService)
    { }

    ngOnInit() {

        let loader = this._loadingCtrl.create({
            content: 'Buscando passageiros. Aguarde...'
        });

        loader.present();

        //** TEMPORARIO - motorista virá do login */
        this._motoristaService.logaMotorista(1)
            .then(() => {
                
                this._motorista = this._motoristaService.Motorista;
                
                this._filhoservice.listaPassageiros(this._motorista.idUsuario)
                    .subscribe(passageiros => {
                        this._passageiro = passageiros;
                        this._passageiroOriginal = this._passageiro;
                        loader.dismiss();
                    },
                    err => this.mostraMsgErro(err)
                    );
            })
            .catch(err => {
                //*** COLOCAR PAGINA DE ERRO */
                console.log(err);
                loader.dismiss();
                err => this.mostraMsgErro(err);
            })
    }

    get passageiros() {
        return this._passageiro;
    }

    selecionaPassageiros(ligado: boolean, passageiro: Filho) {

        if (ligado) {
            this._passageiroSelecionados.push(passageiro);
            this.desabilitaInicia = null;
        } else {
            let index = this._passageiroSelecionados.indexOf(passageiro);
            if (index>=0)
                this._passageiroSelecionados.splice(index, 1);
            if(this._passageiroSelecionados.length == 0)
                this.desabilitaInicia = true;
        }
    }

    search(ev: any) {
        
        this._passageiro = this._passageiroOriginal;

        let val = ev.target.value;
        
        if (val && val.trim() != '') {
            this._passageiro = this._passageiro.filter((passageiro) => {
                return (passageiro.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    iniciaViagem() {

        let loader = this._loadingCtrl.create({
            content: 'Inciando viagem...'
        });

        loader.present();

        let idFilhos: number[] = [];
        this._passageiroSelecionados.forEach(passageiro => {
            idFilhos.push(passageiro.idFilho);
        });

        let viagemDTO = new ViagemDTO(
            null,
            this._motorista.idUsuario,
            this._posicaoGlobalService.posicaoGlobal.latitude,
            this._posicaoGlobalService.posicaoGlobal.latitude,
            idFilhos
        );
   
        this._viagemservice.iniciaViagem(viagemDTO)
            .subscribe(
                viagem => {
                    loader.dismiss();
                    //** emitir alerta mae
                    this.navCtrl.push(ViagemPage, {Viagem: viagem});
                },
                err => {
                    loader.dismiss();
                    this.mostraMsgErro(err);
                });
    }

    private mostraMsgErro(erro){
        this._alertCtrl.create({
            title: 'Erro',
            subTitle: erro,
            buttons: [{ text: 'Ok'}]
        }).present()
    }
}
