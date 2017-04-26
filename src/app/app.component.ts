import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ViagemPage } from '../pages/viagem/viagem'
import { PassageirosPage } from '../pages/passageiros/passageiros'
import { MensagensPage } from '../pages/mensagens/mensagens'


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;

    @ViewChild(Nav) public nav: Nav;

    public paginas = [
        { titulo: 'Viagens', componente: ViagemPage },
        { titulo: 'Passageiros', componente: PassageirosPage },
        { titulo: 'Mensagens', componente: MensagensPage }
    ];

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen) {

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }

    abrePagina(pagina) {
        this.nav.push(pagina.componente);
    }
}

