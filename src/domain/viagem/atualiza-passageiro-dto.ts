export class AtualizaPassageiroDTO{

    constructor(
        public idViagem: number,
        public idFilho: number,
        public posicao_latitude: number,
        public posicao_longitutde: number,
        public embarcado: boolean,
    ){}
}