import { Usuario } from "../usuario/usuario";
import { Filho } from "../filho/filho";

export class Responsavel {

    constructor(
        public Usuario: Usuario = null,
        public adimplente: boolean,
        public Filhos: Filho[] = []
    ){}
}