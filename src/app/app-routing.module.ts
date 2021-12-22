import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tramites',
    loadChildren: () => import('src/app/procedure/procedure.module').then(m => m.ProcedureModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('src/app/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'verificar',
    loadChildren: () => import('src/app/verify/verify.module').then(m => m.VerifyModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('src/app/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'comunicado',
    loadChildren: () => import('src/app/comunicate/comunicate.module').then(m => m.ComunicateModule)
  },
  {
    path: 'control',
    loadChildren: () => import('src/app/control/control.module').then(m => m.ControlModule)
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
