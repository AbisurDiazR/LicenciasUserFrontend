import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcedureRoutingModule } from './procedure-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PermissionsComponent } from './permissions/permissions.component';
import { LicensesComponent } from './licenses/licenses.component';


@NgModule({
  declarations: [
    PermissionsComponent,
    LicensesComponent
  ],
  imports: [
    CommonModule,
    ProcedureRoutingModule,
    SharedModule
  ]
})
export class ProcedureModule { }
