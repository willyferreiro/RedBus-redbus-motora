// import { Motorista } from "../motorista/motorista";
// import { Responsavel } from "../responsavel/responsavel";

export class Usuario{

    constructor(
        public idUsuario: number,
        public telefone: number,
        public nome: string,
        public tipoUsuario: string,
        public senha: string = ""
    ){}
}