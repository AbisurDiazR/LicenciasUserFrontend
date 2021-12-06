import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyPermissionsComponent } from './verify-permissions/verify-permissions.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  {
    path: '',
    component: VerifyComponent
  },
  {
    path: 'licencias',
    component: VerifyComponent
  },
  {
    path: 'permisos',
    component: VerifyPermissionsComponent    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyRoutingModule { }
