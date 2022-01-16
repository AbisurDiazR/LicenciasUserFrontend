import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicensesComponent } from '../shared/licenses/licenses.component';
import { PermissionsComponent } from '../shared/permissions/permissions.component';
import { AltaLicenciasComponent } from './alta-licencias/alta-licencias.component';
import { AltaPermisosComponent } from './alta-permisos/alta-permisos.component';
import { ControlComponent } from './control/control.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { FoliosComponent } from './folios/folios.component';
import { LicensesPicturesComponent } from './licenses-pictures/licenses-pictures.component';
import { MisAsignacionesComponent } from './mis-asignaciones/mis-asignaciones.component';
import { MisCuentasComponent } from './mis-cuentas/mis-cuentas.component';
import { MisLicenciasComponent } from './mis-licencias/mis-licencias.component';
import { MisPermisosComponent } from './mis-permisos/mis-permisos.component';
import { PermissionPicturesComponent } from './permission-pictures/permission-pictures.component';
import { UsersComponent } from './users/users.component';
import { VerLicenciasComponent } from './ver-licencias/ver-licencias.component';
import { VerPermisosComponent } from './ver-permisos/ver-permisos.component';
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
    path: 'ver-permisos',
    component: VerPermisosComponent
  },
  {
    path: 'mis-asignaciones',
    component: MisAsignacionesComponent
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
  },
  {
    path: 'mis-licencias',
    component: MisLicenciasComponent
  },
  {
    path: 'ver-licencias',
    component: VerLicenciasComponent
  },
  {
    path: 'alta-licencia/:id',
    component: AltaLicenciasComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlRoutingModule { }
