import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicensesComponent } from '../shared/licenses/licenses.component';
import { PermissionsComponent } from '../shared/permissions/permissions.component';
import { AltaPermisosComponent } from './alta-permisos/alta-permisos.component';
import { ControlComponent } from './control/control.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { FoliosComponent } from './folios/folios.component';
import { LicensesPicturesComponent } from './licenses-pictures/licenses-pictures.component';
import { MisCuentasComponent } from './mis-cuentas/mis-cuentas.component';
import { MisPermisosComponent } from './mis-permisos/mis-permisos.component';
import { PermissionPicturesComponent } from './permission-pictures/permission-pictures.component';
import { UsersComponent } from './users/users.component';
import { WebmasterComponent } from './webmaster/webmaster.component';

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
  },
  {
    path: 'cuentas',
    component: CuentasComponent
  },
  {
    path: 'cuentas/:id',
    component: CuentasComponent
  },
  {
    path: 'folios',
    component: FoliosComponent
  },
  {
    path: 'mis-cuentas',
    component: MisCuentasComponent
  },
  {
    path: 'alta-permiso/:id',
    component: AltaPermisosComponent
  },
  {
    path: 'mis-permisos',
    component: MisPermisosComponent
  },
  {
    path: 'banners',
    component: WebmasterComponent
  },
  {
    path: 'licenses-pictures',
    component: LicensesPicturesComponent
  },
  {
    path: 'permission-pictures',
    component: PermissionPicturesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlRoutingModule { }
