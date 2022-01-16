import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { NewUserDialogComponent } from 'src/app/shared/new-user-dialog/new-user-dialog.component';


@Component({
  selector: 'app-mis-cuentas',
  templateUrl: './mis-cuentas.component.html',
  styleUrls: ['./mis-cuentas.component.scss']
})
export class MisCuentasComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name','icons'];
  public ELEMENT_DATA: any[] = [];
  dataSource = new MatTableDataSource();
  user: any;

  constructor(
    private _cuentasService: UsersService,
    private _navigation: Router,
    private _authService: AuthService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCuentas();
    this.setCurrentUser();
  }
  
  setCurrentUser() {
    this._authService.getUserById(localStorage.getItem('uid')).subscribe((usr: any) => {
      this.user = { uid: usr.id, ...usr.data() };
    }, err => {
      console.log(err);
    });
  }
  
  public getCuentas() {
    this._cuentasService.getAllUsers().subscribe((res: any) => {
      this.ELEMENT_DATA = [];
      res.forEach((doc: any) => {
        let element = {id: doc.id, ...doc.data()};
        this.ELEMENT_DATA.push({id: element.id, position: element.nombre, name: element.activo, delete: 'ic-users', update: 'ic-users'});
      });
      this.dataSource.data = this.ELEMENT_DATA;
    });
  }

  public activarCuenta(id_cuenta: any){
    this._cuentasService.updateStateUser(id_cuenta, 'Activo').then((res: any) => {
      this.getCuentas();
    });
  }

  public bloquearCuenta(id_cuenta: any){
    this._cuentasService.updateStateUser(id_cuenta, 'Bloqueado').then(() => {
      this.getCuentas();
    })
  }

  public addMemorandum(id: any){
    this._dialog.open(NewUserDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: {
        id_cuenta: id
      }
    }).afterClosed().subscribe(() => {
      this.getCuentas();
    });
  }

  public editarCuenta(id_cuenta: any){
    this._navigation.navigate([`control/cuentas/${id_cuenta}`]);
  }
}
