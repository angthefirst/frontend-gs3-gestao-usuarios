import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {AutenticacaoService} from "../services/autenticacao/autenticacao.service";
import {RetornoLoginDTO} from "../models/retorno-login.model";
import {LocalStorageService} from "../services/local-storage/local-storage.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private autenticacaoService: AutenticacaoService,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  redirecionarParaCadastro() {
    this.router.navigate(['registro']);
  }

  realizarLogin() {
    if (this.form.valid) {
      this.autenticacaoService.realizarLogin({login: this.form.get('login')?.value, senha: this.form.get('senha')?.value})
        .subscribe((retornoLogin ) => {
          this.localStorageService.salvarDadosNoLocalStorage(retornoLogin.token);
          this.router.navigate(['home']);
          this.messageService.add({severity: 'success', summary: 'Login realizado com sucesso!'});
        },error => {
          this.messageService.add({severity: 'error', summary: 'Erro ao realizar login', detail: error?.error?.message});
        });
    } else {
      this.sinalizarCamposComErros(this.form);
      this.messageService.add({severity: 'error', summary: 'Erro ao realizar login', detail: 'Formulário inválido. Por favor, preencha todos os campos corretamente.'});
    }
  }

  sinalizarCamposComErros(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
      if (control instanceof FormGroup) {
        this.sinalizarCamposComErros(control);
      }
    });
  }

}
