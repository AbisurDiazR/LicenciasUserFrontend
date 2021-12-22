import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicensesComponent } from '../shared/licenses/licenses.component';
import { PermissionsComponent } from '../shared/permissions/permissions.component';
import { ControlComponent } from './control/control.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: ControlComponent
  },
  {
    path: 'usuarios',
    component: UsersComponent
  },
  {
    path: 'licencias',
    component: LicensesComponent
  },
  {
    path: 'permisos',
    component: PermissionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlRoutingModule { }
