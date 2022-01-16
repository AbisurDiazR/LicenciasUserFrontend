import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlRoutingModule } from './control-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ControlComponent } from './control/control.component';
import { UsersComponent } from './users/users.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { FoliosComponent } from './folios/folios.component';
import { MisCuentasComponent } from './mis-cuentas/mis-cuentas.component';
import { AltaPermisosComponent } from './alta-permisos/alta-permisos.component';
import { SaveConfirmationComponent } from './save-confirmation/save-confirmation.component';
import { MisPermisosComponent } from './mis-permisos/mis-permisos.component';
import { WebmasterComponent } from './webmaster/webmaster.component';
import { LicensesPicturesComponent } from './licenses-pictures/licenses-pictures.component';
import { PermissionPicturesComponent } from './permission-pictures/permission-pictures.component';
import { MisLicenciasComponent } from './mis-licencias/mis-licencias.component';
import { MisAsignacionesComponent } from './mis-asignaciones/mis-asignaciones.component';
import { VerPermisosComponent } from './ver-permisos/ver-permisos.component';
import { VerLicenciasComponent } from './ver-licencias/ver-licencias.component';
import { AltaLicenciasComponent } from './alta-licencias/alta-licencias.component';


@NgModule({
  declarations: [
    ControlComponent,
    UsersComponent,
    CuentasComponent,
    FoliosComponent,
    MisCuentasComponent,
    AltaPermisosComponent,
    SaveConfirmationComponent,
    MisPermisosComponent,
    WebmasterComponent,
    LicensesPicturesComponent,
    PermissionPicturesComponent,
    MisLicenciasComponent,
    MisAsignacionesComponent,
    VerPermisosComponent,
    VerLicenciasComponent,
    AltaLicenciasComponent
  ],
  imports: [
    CommonModule,
    ControlRoutingModule,
    SharedModule
  ]
})
export class ControlModule { }
