import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-ver-permisos',
  templateUrl: './ver-permisos.component.html',
  styleUrls: ['./ver-permisos.component.scss']
})
export class VerPermisosComponent implements OnInit {
  public ELEMENT_DATA: any[] = [];
  public displayedColumns = ['invoice','brand','line','model','color','numMotor','numSerial','expeditionDate','expirationDate'];
  public dataSource = new MatTableDataSource();

  constructor(
    private _permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    this.setPermisos();
  }

  public setPermisos() {
    this._permissionService.getPermisos().subscribe((res: any) => {
      res.forEach((element: any) => {
        this.ELEMENT_DATA.push({id: element.id, ...element.data()});
      });
      this.dataSource.data = this.ELEMENT_DATA;
    });
  }

}
