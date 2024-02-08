import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RetornoLoginDTO} from "../../models/retorno-login.model";
import {UsuarioDTO} from "../../models/usuario.model";
import {AutenticacaoDTO} from "../../models/autenticacao.model";

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private baseUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) { }

  realizarLogin(autenticacaoDTO: AutenticacaoDTO): Observable<RetornoLoginDTO> {
    return this.http.post<RetornoLoginDTO>(`${this.baseUrl}/login`, autenticacaoDTO);
  }

  realizarRegistro(usuarioDTO: UsuarioDTO): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/registro`, usuarioDTO);
  }
}
