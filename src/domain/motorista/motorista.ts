import { Usuario } from "../usuario/usuario";
import { Filho } from "../filho/filho";
import { Viagem } from "../viagem/viagem";

export class Motorista{

    constructor(

        public Usuario: Usuario,
        public idUsuario: number,
        public emViagem: boolean,
        public posicao_latitude: number,
        public posicao_longitude: number,
        public foto: ByteString,
        public Filhos: Filho[] = [],
        public Viagens: Viagem[] = []
    ){}
}