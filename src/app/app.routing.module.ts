import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {RegistroComponent} from "./registro/registro.component";
import {LoginComponent} from "./login/login.component";
import {RotaInvalidaComponent} from "./rota-invalida/rota-invalida.component";
import {HomeComponent} from "./paginas-usuario-logado/home/home.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'pagina-invalida', component: RotaInvalidaComponent },
  { path: 'registro', component:  RegistroComponent},
  { path: 'home', component:  HomeComponent},
  { path: '**', redirectTo: 'pagina-invalida' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
