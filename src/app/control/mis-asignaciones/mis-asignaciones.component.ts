import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mis-asignaciones',
  templateUrl: './mis-asignaciones.component.html',
  styleUrls: ['./mis-asignaciones.component.scss']
})
export class MisAsignacionesComponent implements OnInit {
  displayedColumns: string[] = ['estatus', 'creationDate', 'quantity', 'used', 'avalaible', 'initialInvoice', 'finalInvoice'];
  public dataSource = new MatTableDataSource();
  user: any;

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._authService.getUserById(localStorage.getItem('uid')).subscribe((usr: any) => {
      let tmpArray = [];
      this.user = { uid: usr.id, ...usr.data() };
      console.log(this.user);
      if(this.user.lastUpdate === undefined){
        tmpArray.push({
          estatus: this.user.activo,
          creationDate: moment(new Date(this.user.creationTime)).format('l'),
          quantity: this.user.folioPermisoFinal,
          used: 3,
          avalaible: this.user.folioPermisoFinal - 3,
          initialInvoice: this.user.folioPermisoInicial,
          finalInvoice: this.user.folioPermisoFinal
        });
        this.dataSource.data = tmpArray;
      }
    });
  }

}
