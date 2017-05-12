import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ViagemPage } from '../viagem/viagem';
import { Filho } from "../../domain/filho/filho";
import { FilhoService } from "../../domain/filho/filho-service";
import { Motorista } from "../../domain/motorista/motorista";
import { MotoristaService } from "../../domain/motorista/motorista-service";
import { Viagem, StatusViagem } from "../../domain/viagem/viagem";
import { ViagemFilho } from "../../domain/viagem/viagem-filho";
import { ViagemService } from "../../domain/viagem/viagem-service";
import { PosicaoGlobalService } from "../../domain/posicaoglobal/posicaoglobal-service";
import { InicioViagemDTO } from "../viagem/inicioViagemDTO";

@Component({
    selector: 'page-passageiros',
    templateUrl: 'passageiros.html'
})
export class PassageirosPage implements OnInit {

    private _motorista: Motorista;
    private _passageiro: Filho[] = [];
    private _passageiroOriginal: Filho[] = []; //guarda lista original para o filtro
    private _passageiroSelecionados: Filho[] = [];


    constructor(
        public navCtrl: NavController,
        private _posicaoGlobalService: PosicaoGlobalService,
        private _loadingCtrl: LoadingController,
        private _filhoservice: FilhoService,
        private _viagemservice: ViagemService,
        private _motoristaService: MotoristaService)
    { }

    ngOnInit() {

        let loader = this._loadingCtrl.create({
            content: 'Buscando passageiros. Aguarde...'
        });

        loader.present();

        //*** obter dados do usuario da sessao
        let idUsuario = 1;
        this._motoristaService.getMotorista(idUsuario)
        .then((motorista) => {
            this._motorista = motorista;
            
            this._filhoservice.listaPassageiros()
            .then((passageiros) => {
                this._passageiro = passageiros;
                this._passageiroOriginal = this._passageiro;
                loader.dismiss();
            }, err => { 
                //*** COLOCAR PAGINA DE ERRO */
                console.log(err);
                loader.dismiss();
            })
        }, err => { 
            console.log(err);
            loader.dismiss();
        })
    }

    get passageiros() {
        return this._passageiro;
    }

    selecionaPassageiros(ligado: boolean, passageiro: Filho) {

        if (ligado) {
            this._passageiroSelecionados.push(passageiro);
        } else {
            let index = this._passageiroSelecionados.indexOf(passageiro);
            if (index>=0)
                this._passageiroSelecionados.splice(index, 1);
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

        let idFilhos: number[] = [];
        this._passageiroSelecionados.forEach(passageiro => {
            idFilhos.push(passageiro.idFilho);
        });

        let inicioViagem = new InicioViagemDTO(
            this._motorista.idUsuario,
            this._posicaoGlobalService.posicaoGlobal.latitude,
            this._posicaoGlobalService.posicaoGlobal.latitude,
            idFilhos
        );
   
        this._viagemservice.iniciaViagem(inicioViagem)
        .then((viagem: Viagem) => {
            
            this.navCtrl.push(ViagemPage, {Viagem: viagem});

        }), err => { 
            console.log(err);
        }
        
        //emitir alerta mae
    }

}
