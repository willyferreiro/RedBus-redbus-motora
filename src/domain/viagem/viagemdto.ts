export class ViagemDTO{

    constructor(
        public idViagem: number,
        public idMotorista: number,
        public posicao_latitude: number,
        public posicao_longitude: number,
        public idFilhos: number[] = []
    ){}
}