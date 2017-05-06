import { ViagemFilho } from "./viagem-filho";
import { Motorista } from "../motorista/motorista";

export class Viagem{

    constructor(
        
        public idViagem: number = null,
        public idMotorista: number,
        public posicaoInicio_latitude: number,
        public posicaoInicio_longitude: number,
        public dataInicioViagem: Date = null,
        public dataFimViagem: Date = null,
        public posicaoFim_latitude: number = 0,
        public posicaoFim_longitude: number = 0,
        public statusViagem: StatusViagem = StatusViagem.NaoIniciada,
        public Motorista: Motorista = null,
        public Viagem_Filho: ViagemFilho[] = []
    ){}

    // get Viagem_Status(){
    //     return this.Viagem_Status;
    // }
}

export enum StatusViagem{
    NaoIniciada = 0,
    Andamento = 1,
    Concluida = 2
}