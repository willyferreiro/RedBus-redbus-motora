import { PosicaoGlobal } from "../PosicaoGlobal/PosicaoGlobal";

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