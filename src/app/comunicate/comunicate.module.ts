import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComunicateRoutingModule } from './comunicate-routing.module';
import { ComunicateComponent } from './comunicate/comunicate.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ComunicateComponent
  ],
  imports: [
    CommonModule,
    ComunicateRoutingModule,
    SharedModule
  ]
})
export class ComunicateModule { }
