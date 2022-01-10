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
    PermissionPicturesComponent
  ],
  imports: [
    CommonModule,
    ControlRoutingModule,
    SharedModule
  ]
})
export class ControlModule { }
