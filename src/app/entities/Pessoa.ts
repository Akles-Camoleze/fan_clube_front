import {Endereco} from "./Endereco";

export class Pessoa {
  id!: number;
  nome!: string;
  telefone!: number;
  sobrenome!: string;
  endereco!: Endereco;
  dataNascimento!: Date;
  readonly qtdInscricao!: number;
}
