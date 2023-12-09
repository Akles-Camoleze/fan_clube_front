import {Pessoa} from "./Pessoa";
import {TipoUsuario} from "./TipoUsuario";

export class Usuario {
  id!: number;
  nome!: string;
  email!: string;
  senha!: string;
  pessoa!: Pessoa;
  tipoUsuario!: TipoUsuario;
}
