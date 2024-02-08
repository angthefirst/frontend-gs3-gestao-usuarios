import { Component } from '@angular/core';
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../services/local-storage/local-storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    ToolbarModule,
    ButtonModule
  ],
  standalone: true,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router,
              private localStorageService: LocalStorageService) {
  }

  logout() {
    this.localStorageService.removerDadosDoLocalStorage();
    this.router.navigate(['']);
  }

  obterPerfil() {
    return this.localStorageService.obterPerfilDoUsuarioLogado();
  }
}
