import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyRoutingModule } from './verify-routing.module';
import { VerifyComponent } from './verify/verify.component';
import { VerifyPermissionsComponent } from './verify-permissions/verify-permissions.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    VerifyComponent,
    VerifyPermissionsComponent
  ],
  imports: [
    CommonModule,
    VerifyRoutingModule,
    SharedModule
  ]
})
export class VerifyModule { }
