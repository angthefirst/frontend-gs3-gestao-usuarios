import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {RetornoDadosUsuarioDTO, UsuarioDTO} from "../../models/usuario.model";
import {Page} from "../../models/page.model";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = environment.apiUrl + '/usuarios';

  constructor(private http: HttpClient) { }

  obterUsuarioPorId(idUsuario: string): Observable<RetornoDadosUsuarioDTO> {
    return this.http.get<RetornoDadosUsuarioDTO>(`${this.baseUrl}/${idUsuario}`);
  }

  obterTodosOsUsuariosPaginados(pagina: number, tamanhoPagina: number): Observable<Page<RetornoDadosUsuarioDTO>> {
    let params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('tamanhoPagina', tamanhoPagina.toString());

    return this.http.get<Page<RetornoDadosUsuarioDTO>>(this.baseUrl, { params });
  }

  atualizarUsuarioEPerfil(idUsuario: string, usuarioDTO: UsuarioDTO): Observable<RetornoDadosUsuarioDTO> {
    return this.http.put<RetornoDadosUsuarioDTO>(`${this.baseUrl}/admin/${idUsuario}`, usuarioDTO);
  }

  atualizarUsuario(idUsuario: string, usuarioDTO: UsuarioDTO): Observable<RetornoDadosUsuarioDTO> {
    return this.http.put<RetornoDadosUsuarioDTO>(`${this.baseUrl}/comum/${idUsuario}`, usuarioDTO);
  }
}
