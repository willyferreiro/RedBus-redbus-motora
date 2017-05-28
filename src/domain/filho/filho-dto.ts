export class FilhoDTO{

    constructor(
        public idFilho?: number,
        public idResponsavel?: number,
        public idMotorista?: number,
        public nome?: string,
        public dddResponsavel?: number,
        public telefoneResponsavel?: number,
        public enderecoCasa?: string,
        public enderecoEscola?: string,
        public posicao_latitudeCasa?: number,
        public posicao_longitutdeCasa?: number,
        public posicao_latitudeEscola?: number,
        public posicao_longitutdeEscola?: number,
        public foto?: string,
        public fotoCompleta?: string)
    {}

}