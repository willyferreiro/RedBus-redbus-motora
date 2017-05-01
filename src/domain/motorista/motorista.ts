import { PosicaoGlobal } from "../posicaoglobal/posicaoglobal";

export class Motorista{

    constructor(
        public id: number,
        public telefone: number,
        public nome: string,
        public senha: string = "",
        public emViagem: boolean = false,
        public posicaoGlobal: PosicaoGlobal = null
    ){}
}