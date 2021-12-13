import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { RequistosService } from 'src/app/services/requistos.service';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.scss']
})
export class ProcedureComponent implements OnInit {
  public requires!: any;
  public licensesRequires!: any;
  public permissionsRequires!: any;
  public load_license: boolean = false;
  public load_permission: boolean = false;

  constructor(
    private _requisitoService: RequistosService
  ) { }

  ngOnInit(): void {
    this.setLicensesRequires();
    this.setPermissionsRequires();
  }
  
  public setPermissionsRequires() {
    this._requisitoService.getRequisitosPermisos().subscribe((subcollection: any) => {
      subcollection.forEach((element: any) => {
       this.permissionsRequires = {id: element.id, ...element.data()};
       this.load_permission = !this.load_permission;
      });
    });
  }
  
  
  public setLicensesRequires() {
    this._requisitoService.getRequisitosLicencias().subscribe((subcollection: any) => {
      subcollection.forEach((element: any) => {
       this.licensesRequires = {id: element.id, ...element.data()};
       this.load_license = !this.load_permission;
      });
    });
  }

}
