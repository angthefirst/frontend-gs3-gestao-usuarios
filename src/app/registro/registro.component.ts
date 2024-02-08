import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {AutenticacaoService} from "../services/autenticacao/autenticacao.service";
import {UsuarioDTO} from "../models/usuario.model";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private autenticacaoService: AutenticacaoService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      email: ['', Validators.required],
      nomeCompleto: ['', Validators.required],
      rua: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  redirecionarParaPaginaInicial() {
    this.router.navigate(['']);
  }

  registrarUsuario() {
    if (this.form.valid) {
      const usuarioDTO = this.recuperarObjetoUsuarioDTO();
      this.autenticacaoService.realizarRegistro(usuarioDTO).subscribe(() => {
        this.messageService.add({severity: 'success', summary: 'Registro realizado com sucesso! Por favor, realize o login.'});
        this.router.navigate(['']);
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Erro ao realizar registro', detail: error?.error?.message});
      });
    } else {
      this.sinalizarCamposComErros(this.form);
      this.messageService.add({severity: 'error', summary: 'Erro ao realizar registro', detail: 'Formulário inválido. Por favor, preencha todos os campos corretamente.'});
    }
  }

  private recuperarObjetoUsuarioDTO() {
    const formValues = this.form.value;
    const {id, login, senha, nomeCompleto, email, rua, bairro, cidade} = formValues;
    const usuarioDTO: UsuarioDTO = {
      id,
      login,
      senha,
      nomeCompleto,
      email,
      perfil: null,
      endereco: {usuarioDTO: null, rua: rua, bairro: bairro, cidade: cidade}
    };
    return usuarioDTO;
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
