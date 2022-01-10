import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-mis-permisos',
  templateUrl: './mis-permisos.component.html',
  styleUrls: ['./mis-permisos.component.scss']
})
export class MisPermisosComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name',];
  public ELEMENT_DATA: any[] = [];
  dataSource = new MatTableDataSource();

  constructor(
    private _permissionService: PermissionService,
    private _navigate: Router
  ) { }

  ngOnInit(): void {
    this.setPermisos(localStorage.getItem('uid'));
  }
  
  public setPermisos(uid: string | null) {
    this._permissionService.getPermisosByUser(uid).subscribe((res: any) => {
      res.forEach((element: any) => {
        this.ELEMENT_DATA.push({id: element.id, ...element.data()});
      });
      this.dataSource.data = this.ELEMENT_DATA;
    });
  }

  public goToCerficate(element_id: any){
    this._navigate.navigate([`control/alta-permiso/${element_id}`]);
  }

}
