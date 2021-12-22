import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlRoutingModule } from './control-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ControlComponent } from './control/control.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    ControlComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    ControlRoutingModule,
    SharedModule
  ]
})
export class ControlModule { }
