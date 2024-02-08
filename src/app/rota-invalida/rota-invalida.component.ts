import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rota-invalida',
  templateUrl: './rota-invalida.component.html',
  standalone: true,
  imports: [
    ButtonModule
  ],
  styleUrls: ['./rota-invalida.component.css']
})
export class RotaInvalidaComponent {

  constructor(private router: Router) {
  }

  redirecionarParaInicio() {
    this.router.navigate(['']);
  }
}
