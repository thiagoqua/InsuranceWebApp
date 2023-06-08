import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ImportComponent } from './import/import.component';
import { AdministrateComponent } from './administrate/administrate.component';
import { authGuard } from './helpers/auth.guard';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[authGuard]},
  {path:'iniciar',component:LoginComponent,canActivate:[authGuard]},
  {path:'importar',component:ImportComponent,canActivate:[authGuard]},
  {path:'administracion',component:AdministrateComponent,canActivate:[authGuard]},
  {path:'administracion/:insuredId',component:AdministrateComponent,canActivate:[authGuard]},
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
