import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LocalStorageService} from "../../services/local-storage/local-storage.service";
import {RetornoDadosUsuarioDTO, UsuarioDTO} from "../../models/usuario.model";
import {UsuarioService} from "../../services/usuario/usuario.service";
import {Page} from "../../models/page.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuarios: Array<Object> = [];
  paginaAtual = 0;
  tamanhoDaPagina = 100;

  ngOnInit(): void {
    this.usuarioService.obterTodosOsUsuariosPaginados(this.paginaAtual, this.tamanhoDaPagina).subscribe((usuarios: Page<RetornoDadosUsuarioDTO>) => {
      this.usuarios = usuarios.content;
    });
  }

  constructor(private router: Router,
              private localStorageService: LocalStorageService,
              private usuarioService: UsuarioService) {
  }

  logout() {
    this.localStorageService.removerDadosDoLocalStorage();
    this.router.navigate(['']);
  }

  obterPerfil(): string | null {
    return this.localStorageService.obterPerfilDoUsuarioLogado();
  }

  editarUsuario(usuario: UsuarioDTO) {
    this.router.navigate(['atualizacao-cadastral'], { queryParams: { id: usuario.id} });
  }

  atualizarInformacoesCadastraisPerfilComum() {
    this.router.navigate(['atualizacao-cadastral'], { queryParams: { id: this.localStorageService.obterIdUsuarioLogado()} });
  }
}
