import { Component } from '@angular/core';

import { PassageiroPage } from '../passageiro/passageiro';
import { PassageirosPage } from '../passageiros/passageiros';
import { MensagensPage } from '../mensagens/mensagens';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PassageiroPage;
  tab2Root = PassageirosPage;
  tab3Root = MensagensPage;

  constructor() {

  }
}
