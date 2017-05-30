export class Filho{

    constructor(
        public idFilho: number,
        public idResponsavel: number,
        public idMotorista: number,
        public nome: string,
        public emViagem: boolean = false,
        public embarcado: boolean = false,
        posicao_latitudeCasa: number = 0,
        posicao_longitutdeCasa: number = 0,
        posicao_latitudeEscola: number = 0,
        posicao_longitutdeEscola: number = 0,
        public foto: string = '',
        public fotoCompleta: string = '')
    {}

}