import {PerfilDTO} from "./perfil.model";
import {EnderecoDTO} from "./endereco.model";

export interface UsuarioDTO {
  id: string;
  login: string;
  senha: string;
  nomeCompleto: string;
  email: string;
  perfil: PerfilDTO | null;
  endereco: EnderecoDTO;
}

export interface RetornoDadosUsuarioDTO {
  id: string;
  login: string;
  nomeCompleto: string;
  email: string;
  perfil: PerfilDTO | null;
  endereco: EnderecoDTO;
}
