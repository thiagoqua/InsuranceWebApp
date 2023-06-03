import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ImportComponent } from './import/import.component';
import { AdministrateComponent } from './administrate/administrate.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'iniciar',component:LoginComponent},
  {path:'importar',component:ImportComponent},
  {path:'administracion',component:AdministrateComponent},
  {path:'administracion/:insuredId',component:AdministrateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
