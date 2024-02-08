import {UsuarioDTO} from "./usuario.model";

export interface EnderecoDTO {
  usuarioDTO: UsuarioDTO | null;
  rua: string;
  bairro: string;
  cidade: string;
}

export interface RetornoEnderecoDTO {
  rua: string;
  bairro: string;
  cidade: string;
}
