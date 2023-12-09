import {Cidade} from "./Cidade";

export class Endereco {
  id!: number;
  cidade!: Cidade;
  numero!: number;
  rua!: string;
  bairro!: string;
}
