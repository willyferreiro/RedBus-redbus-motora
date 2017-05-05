import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from "@angular/http";
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Geolocation } from '@ionic-native/geolocation';
import { PosicaoGlobalService } from "../domain/posicaoglobal/posicaoglobal-service";
import { PassageiroService } from "../domain/passageiro/passageiro-service";

import { PassageiroPage } from '../pages/passageiro/passageiro';
import { PassageirosPage } from '../pages/passageiros/passageiros';
import { ViagemPage } from '../pages/viagem/viagem';
import { MensagensPage } from '../pages/mensagens/mensagens';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    PassageiroPage,
    PassageirosPage,
    ViagemPage,
    MensagensPage,
    TabsPage
  ],
  imports: [
    BrowserModule, 
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PassageiroPage,
    PassageirosPage,
    ViagemPage,
    MensagensPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    Geolocation,
    PosicaoGlobalService,
    PassageiroService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
