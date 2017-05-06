import { Filho } from "../filho/filho";
import { Viagem } from "../viagem/viagem";

export class ViagemFilho{

    constructor(
        
        public idViagem: number,
        public idFilho: number,
        public dataEmbarque: Date = null,
        public dataDesembarque: Date = null,
        public posicaoEmbarque_latitude: number = 0,
        public posicaoEmbarque_longitude: number = 0,
        public posicaoDesembarque_latitude: number = 0,
        public posicaoDesembarque_longitude: number = 0,
        public Filho: Filho = null,
        public Viagem: Viagem = null,
    ){}
}