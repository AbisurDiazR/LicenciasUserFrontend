import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CUENTAS } from 'src/app/shared/data';
import { SaveConfirmationComponent } from '../save-confirmation/save-confirmation.component';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent implements OnInit {
  public formCuenta!: any;
  public cuentas = CUENTAS;
  public licencias = false;
  public permisos = false;
  public id_cuenta!: string | null;
  public hide: boolean = true;

  constructor(
    private _fb: FormBuilder,
    private _userService: AuthService,
    private _navigation: Router,
    private _route: ActivatedRoute,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.formCuenta = this._fb.group({
      correo: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      funciones: new FormControl('', Validators.required),
      rol: new FormControl('', Validators.required),
      foliosLicencia: new FormControl(''),
      folioPermisoInicial: new FormControl(''),
      folioPermisoFinal: new FormControl(''),
      numFolios: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.id_cuenta = this._route.snapshot.paramMap.get('id');
    if (this.id_cuenta !== null) this.setDataCuenta(this.id_cuenta);
  }

  public setDataCuenta(id_cuenta: string) {
    this._userService.getUserById(id_cuenta).subscribe((usr: any) => {
      let cuenta = { uid: usr.id, ...usr.data() };
      this.formCuenta.controls['correo'].setValue(cuenta.correo);
      this.formCuenta.controls['password'].setValue(cuenta.password);
      this.formCuenta.controls['rol'].setValue(cuenta.rol);
      this.formCuenta.controls['foliosLicencia'].setValue(cuenta.foliosLicencia);
      this.formCuenta.controls['folioPermisoInicial'].setValue(cuenta.folioPermisoInicial);
      this.formCuenta.controls['folioPermisoFinal'].setValue(cuenta.folioPermisoFinal);
      cuenta.funciones.forEach((element: any) => {
        if(element.label === 'Crear permisos'){ 
          this.permisos = true;
          this.setNumFolios();
        }
      });
    });
  }

  public setLicencias() {
    this.licencias = !this.licencias;
  }

  public setPermisos() {
    this.permisos = !this.permisos;
  }

  public save() {
    let funcionesTmp = []
    if (this.licencias) funcionesTmp.push({ icon: 'ic-users', iconof: '', label: 'Crear licencias', route: 'control/licencias' });
    if (this.permisos) funcionesTmp.push({ icon: 'ic-users', iconof: '', label: 'Crear permisos', route: 'control/permisos' });
    this.formCuenta.controls['funciones'].setValue(funcionesTmp);
    if(this.formCuenta.valid){this._userService.createAccount(this.formCuenta.controls['correo'].value, this.formCuenta.controls['password'].value).then((res: any) => {
      let usr = res.user;
      this._userService.saveUserData(this.formCuenta.value, usr.metadata, usr.uid);
      this._dialog.open(SaveConfirmationComponent, {
        width: '330px',
        height: '150px',
      });
      this._navigation.navigate(['control/mis-cuentas']);
    });}else{
      this._snackBar.open('Falta llenar campos','',{
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000
      });
    }
  }

  public update() {
    let funcionesTmp = []
    if (this.licencias) funcionesTmp.push({ icon: 'ic-users', iconof: '', label: 'Crear licencias', route: 'control/licencias' });
    if (this.permisos) funcionesTmp.push({ icon: 'ic-users', iconof: '', label: 'Crear permisos', route: 'control/permisos' });
    this.formCuenta.controls['funciones'].setValue(funcionesTmp);
    console.log(this.formCuenta.value);
    if (this.formCuenta.valid) {
      this._userService.updateUserData(this.formCuenta.value, this.id_cuenta);
      this._dialog.open(SaveConfirmationComponent, {
        width: '330px',
        height: '150px',
      });
      this._navigation.navigate(['control/mis-cuentas']);
    }else{
      this._snackBar.open('Falta llenar campos','',{
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000
      });
    }
  }

  setNumFolios(){
    let initialInvoice = this.formCuenta.controls['folioPermisoInicial'].value;
    let finalInvoice = this.formCuenta.controls['folioPermisoFinal'].value;
    let numeFolios: number = (finalInvoice - initialInvoice) + 1;
    this.formCuenta.controls['numFolios'].setValue(numeFolios);
  }

}
