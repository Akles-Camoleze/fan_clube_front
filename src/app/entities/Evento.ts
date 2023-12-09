import {Endereco} from "./Endereco";
import {Arquivo} from "./Arquivo";

export class Evento {
  id!: number;
  nome!: string;
  capacidade!: number;
  data!: Date;
  descricao!: string;
  valor!: number;
  endereco!: Endereco;
  arquivo!: Arquivo;
}
