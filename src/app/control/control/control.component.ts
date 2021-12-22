import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
    private _navigation: Router
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
