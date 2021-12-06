import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicensesComponent } from './licenses/licenses.component';
import { PermissionsComponent } from './permissions/permissions.component';

const routes: Routes = [
  {
    path: 'permisos',
    component: PermissionsComponent
  },
  {
    path: 'licencias',
    component: LicensesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcedureRoutingModule { }
