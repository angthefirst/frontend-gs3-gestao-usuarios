import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  salvarDadosNoLocalStorage(token: string) {
    localStorage.setItem('token', token);
    const tokenDecodificado = this.decodificarToken(token);
    const perfil = tokenDecodificado ? tokenDecodificado.perfis[0] : null;
    localStorage.setItem('perfil', perfil);
    localStorage.setItem('idUsuario', tokenDecodificado.idUsuario);
  }

  obterPerfilDoUsuarioLogado(): string | null {
    return localStorage.getItem('perfil');
  }

  obterToken(): string | null {
    return localStorage.getItem('token');
  }

  obterIdUsuarioLogado(): string | null {
    return localStorage.getItem('idUsuario');
  }

  removerDadosDoLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('perfil');
    localStorage.removeItem('idUsuario');
  }

  decodificarToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Erro ao decodificar o token JWT:', error);
      return null;
    }
  }
}
