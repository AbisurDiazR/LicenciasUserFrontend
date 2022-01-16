import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LicenciasService } from 'src/app/services/licencias.service';

@Component({
  selector: 'app-mis-licencias',
  templateUrl: './mis-licencias.component.html',
  styleUrls: ['./mis-licencias.component.scss']
})
export class MisLicenciasComponent implements OnInit {
  public ELEMENT_DATA: any[] = [];
  public displayedColumns = ['folio','expeditionDate','expirationDate','taxpayer','curp'];
  public dataSource = new MatTableDataSource();

  constructor(
    private _licenciaService: LicenciasService,
    private _navigate: Router
  ) { }

  ngOnInit(): void {
    this.setLicencias(localStorage.getItem('uid'));
  }

  public setLicencias(uid: string | null) {
    this._licenciaService.getLicenciasByUser(uid).subscribe((res: any) => {
      res.forEach((element: any) => {
        this.ELEMENT_DATA.push({id: element.id, ...element.data()});
      });
      this.dataSource.data = this.ELEMENT_DATA;
    });
  }

  public goToCerficate(element_id: any){
    this._navigate.navigate([`control/alta-licencia/${element_id}`]);
  }
}
