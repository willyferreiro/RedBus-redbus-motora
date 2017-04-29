import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Geolocation } from '@ionic-native/geolocation';
import { PosicaoGlobalService } from "../domain/PosicaoGlobal/PosicaoGlobal-Service";

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
    Geolocation,
    PosicaoGlobalService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
