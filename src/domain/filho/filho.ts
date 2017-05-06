export class Filho{

    constructor(
        public id: number,
        public idResponsavel: number,
        public idMotorista: number,
        public nome: string,
        public emViagem: boolean = false,
        public embarcado: boolean = false,
        public enderecoCasa: string = '',
        public enderecoEscola: string = '',
        public foto: ByteString = '',
        public fotoCompleta: ByteString = '',
        public posicao_latitude: number = 0,
        public posicao_longitude: number = 0)
    {}

}