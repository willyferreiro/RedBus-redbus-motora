import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { MotoristaService } from "../../domain/motorista/motorista-service";
import { Motorista } from "../../domain/motorista/motorista";
import { FilhoDTO } from "../../domain/filho/filho-dto";
import { FilhoService } from "../../domain/filho/filho-service";

@Component({
    selector: 'page-passageiro',
    templateUrl: 'passageiro.html'
})
export class PassageiroPage implements OnInit {

    public passageiro: FilhoDTO;
    private _motorista: Motorista;
    public fotoTela = null;
    public fotoCompletaTela = null;

    constructor(
        public navCtrl: NavController,
        private _alertCtrl: AlertController,
        private _camera: Camera,
        private _motoristaService: MotoristaService,
        private _filhoService: FilhoService) {

        this.passageiro = new FilhoDTO();
    }

    ngOnInit() {
         //** TEMPORARIO - motorista virá do login */
        this._motoristaService.logaMotorista(1)
            .then(() => {
                
                this._motorista = this._motoristaService.Motorista;
            },
            err => this.mostraMsgErro(err)
            ); 
    }

    public tiraFoto(codimg: number){

       const options: CameraOptions = {
            quality: 75,
            destinationType: this._camera.DestinationType.DATA_URL,
            encodingType: this._camera.EncodingType.JPEG,
            mediaType: this._camera.MediaType.PICTURE,
            targetHeight: 100,
            targetWidth: 100
        }

        this._camera.getPicture(options)
            .then(imageData => {
                
                let base64Image = "data:image/jpeg;base64," + imageData;
                if (codimg == 1){
                    this.passageiro.foto = imageData;
                    this.fotoTela = base64Image;
                }   
                else{
                    this.passageiro.fotoCompleta = imageData;
                    this.fotoCompletaTela =  base64Image;
                }
            }
            , err => this.mostraMsgErro(err)
            );
    }

    salvaPassageiro() {
        
        this.passageiro.idMotorista = this._motorista.idUsuario;

        this._filhoService.salvaPassageiro(this.passageiro)
        .subscribe(
            data => {
                console.log(data);
                this.passageiro = data;
                
                this._alertCtrl.create({
                    title: 'Sucesso',
                    subTitle: `Passageiro ${this.passageiro.nome} cadastrado`,
                    buttons: [{ text: 'Ok', handler: () => this.limpaTela() }]
                }).present()
            },
            err => this.mostraMsgErro(err)
        )
    }

    private limpaTela() {
        this.passageiro = new FilhoDTO();
    }

    private mostraMsgErro(erro){

        this._alertCtrl.create({
            title: 'Erro',
            subTitle: erro,
            buttons: [{ text: 'Ok'}]
        }).present()
    }
}
