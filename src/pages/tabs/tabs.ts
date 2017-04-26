import { Component } from '@angular/core';

import { PassageiroPage } from '../passageiro/passageiro';
import { ViagemPage } from '../viagem/viagem';
import { MensagensPage } from '../mensagens/mensagens';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PassageiroPage;
  tab2Root = ViagemPage;
  tab3Root = MensagensPage;

  constructor() {

  }
}
