import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MemorandumDialogComponent } from 'src/app/shared/memorandum-dialog/memorandum-dialog.component';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {
  public formCredentials!: any;

  constructor(
    private _fb: FormBuilder,
    private _loginService: AuthService,
    private _navigation: Router,
    private _dialog: MatDialog
  ) {
    this.formCredentials = _fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  public login(){
    let email = this.formCredentials.controls['email'].value;
    let password = this.formCredentials.controls['password'].value;
    this._loginService.login(email, password).then((res: any) => {
      console.log(res);
      if(res === 'Firebase: The email address is badly formatted. (auth/invalid-email).'){
        this._dialog.open(MemorandumDialogComponent, {
          width: 'fit-content',
          height: 'fit-content',
          data: {
            memorandum: 'El correo no tiene un formato correcto'
          }
        })
      }
      if (res === 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).') {
        this._dialog.open(MemorandumDialogComponent, {
          width: 'fit-content',
          height: 'fit-content',
          data: {
            memorandum: 'No hay usuarios registrados con ese correo'
          }
        })
      }
      if (res === 'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).') {
        this._dialog.open(MemorandumDialogComponent, {
          width: 'fit-content',
          height: 'fit-content',
          data: {
            memorandum: 'Contraseña incorrecta'
          }
        })
      }
      if (res === 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).') {
        this._dialog.open(MemorandumDialogComponent, {
          width: 'fit-content',
          height: 'fit-content',
          data: {
            memorandum: 'Ha intentado acceder con una contraseña incorrecta demasiadas veces, intente mas tarde'
          }
        })
      }
      if (res.user !== undefined) {
        this._loginService.getUserById(res.user.uid).subscribe((usr: any) => {
          let user = {uid: usr.id, ...usr.data()};
          localStorage.setItem('uid', user.uid);
          this._navigation.navigate(['/control/usuarios']);
        });
      }
    });
  }

}
