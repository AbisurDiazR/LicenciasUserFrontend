import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComunicateComponent } from './comunicate/comunicate.component';

const routes: Routes = [
  {
    path: '',
    component: ComunicateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComunicateRoutingModule { }
