import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {UsuarioService} from "../../services/usuario/usuario.service";
import {LocalStorageService} from "../../services/local-storage/local-storage.service";
import {UsuarioDTO} from "../../models/usuario.model";

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  formEdicaoUsuario: FormGroup = this.carregarFormVazio();
  idUsuario: string = '';
  dadosUsuarioAtuais: any = {};
  perfis = [{id: 1, descricao: 'ADMIN'}, {id: 2, descricao: 'COMUM'}];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private usuarioService: UsuarioService,
              private localStorageService: LocalStorageService) {
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.idUsuario = params['id'];
    });

    await this.usuarioService.obterUsuarioPorId(this.idUsuario).toPromise().then(usuario => {
      this.dadosUsuarioAtuais = usuario;
    }, error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro ao obter dados do usuário',
        detail: error?.error?.message
      });
      this.router.navigate(['home']);
    });

    this.carregarForm();
  }

  private carregarForm() {
    console.log(this.dadosUsuarioAtuais);
    this.formEdicaoUsuario = this.formBuilder.group({
      nomeCompleto: [this.dadosUsuarioAtuais.nomeCompleto, Validators.required],
      login: [this.dadosUsuarioAtuais.login, Validators.required],
      email: [this.dadosUsuarioAtuais.email, Validators.required],
      perfil: [this.dadosUsuarioAtuais.perfil, Validators.required],
      rua: [this.dadosUsuarioAtuais.endereco.rua, Validators.required],
      bairro: [this.dadosUsuarioAtuais.endereco.bairro, Validators.required],
      cidade: [this.dadosUsuarioAtuais.endereco.cidade, Validators.required],
    });
  }

  private carregarFormVazio() {
    return this.formBuilder.group({
      nomeCompleto: ['', Validators.required],
      login: ['', Validators.required],
      email: ['', Validators.required],
      perfil: ['', Validators.required],
      rua: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
    });
  }

  redirecionarParaHome() {
    this.router.navigate(['home']);
  }

  atualizarUsuario() {
    if (this.formEdicaoUsuario.valid) {
      const usuarioDTO = this.recuperarObjetoUsuarioDTO();
      if (this.ehPerfilComum()) {
        this.atualizarDadosByComum(usuarioDTO);
      } else {
        this.atualizarDadosByAdmin(usuarioDTO);
      }
    } else {
      this.sinalizarCamposComErros(this.formEdicaoUsuario);
      this.messageService.add({severity: 'error', summary: 'Erro ao realizar atualização', detail: 'Formulário inválido. Por favor, preencha todos os campos corretamente.'});
    }
  }

  private atualizarDadosByAdmin(usuarioDTO: UsuarioDTO) {
    this.usuarioService.atualizarUsuarioEPerfil(this.idUsuario, usuarioDTO).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Atualização realizada com sucesso.'});
      this.router.navigate(['home']);
    }, error => {
      this.messageService.add({severity: 'error', summary: 'Erro ao realizar atualização', detail: error?.error?.message});
    });
  }

  private atualizarDadosByComum(usuarioDTO: UsuarioDTO) {
    this.usuarioService.atualizarUsuario(this.idUsuario, usuarioDTO).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Atualização realizada com sucesso.'});
      this.router.navigate(['home']);
    }, error => {
      this.messageService.add({severity: 'error', summary: 'Erro ao realizar registro', detail: error?.error?.message});
    });
  }

  private recuperarObjetoUsuarioDTO() {
    const formValues = this.formEdicaoUsuario.value;
    const {login, senha, nomeCompleto, email, rua, bairro, cidade, perfil} = formValues;
    const usuarioDTO: UsuarioDTO = {
      id: this.idUsuario,
      login,
      senha,
      nomeCompleto,
      email,
      perfil: perfil,
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

  ehPerfilComum() {
    return this.localStorageService.obterPerfilDoUsuarioLogado() == "COMUM";
  }
}
