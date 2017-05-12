export class InicioViagemDTO{

    constructor(
        public idMotorista: number,
        public posicaoInicio_latitude: number,
        public posicaoInicio_longitude: number,
        public idFilhos: number[] = []
    ){}
}