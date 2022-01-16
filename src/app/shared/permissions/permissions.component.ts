import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { PermissionService } from 'src/app/services/permission.service';
import { Router } from '@angular/router';
import { CURP_REGEX, INVOICE_REGEX, VIN_REGEX, YEAR_REGEX } from '../data';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  public formPermission!: any;
  public curp = {
    value: ''
  };
  public vin = { value: '' };
  public motorNumber = { value: '' };
  public currentUser!: any;

  constructor(
    private _fb: FormBuilder,
    private _permissionService: PermissionService,
    private _navigation: Router,
    private _userService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    this.formPermission = this._fb.group({
      vehicleBrand: new FormControl('', [Validators.required]),
      vehicleLine: new FormControl('', [Validators.required]),
      vehicleModel: new FormControl('', [Validators.required]),
      vehicleColor: new FormControl('', [Validators.required]),
      vehicleSerialNumber: new FormControl('', [Validators.required, Validators.pattern(VIN_REGEX)]),
      vehicleMotorNumber: new FormControl('', [Validators.required]),
      solicitantName: new FormControl('', [Validators.required]),
      solicitantStreet: new FormControl('', [Validators.required]),
      solicitantLocation: new FormControl('', [Validators.required]),
      curp: new FormControl('', [Validators.required]),
      invoice: new FormControl('', [Validators.required]),
      import: new FormControl('', [Validators.required]),
      expeditionDate: new FormControl(''),
      expirationDate: new FormControl(''),
      creatorUid: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    moment.locale('es')
    this.formPermission.controls['expeditionDate'].setValue(moment().format('L'));
    this.formPermission.controls['expirationDate'].setValue(moment(this.addDaysToDate(new Date(), 30)).format('L'));
    this.setUser(localStorage.getItem('uid'));
  }

  public setUser(uid: string | null) {
    this._userService.getUserById(uid).subscribe((res: any) => {
      this.currentUser = res.data();
      console.log(this.currentUser);
    });
  }

  public addDaysToDate(date: any, days: any) {
    var res = new Date(date);
    res.setDate(res.getDate() + days);
    return res;
  }

  public save() {
    this.formPermission.controls['creatorUid'].setValue(localStorage.getItem('uid'));
    if (this.formPermission.valid) {
      this._permissionService.addPermission(this.formPermission.value).then((docRef) => {
        console.log(`Document written with ID: ${docRef.id}`);
        this._navigation.navigate([`control/alta-permiso/${docRef.id}`]);
      });
    } else {
      alert('Faltan datos por ingresar');
    }
  }

  public validateInvoice(event: any) {
    let value = event.target.value;
    if (value >= this.currentUser.folioPermisoInicial && value <= this.currentUser.folioPermisoFinal) {
    } else {
      if (this.currentUser.folioPermisoInicial === undefined && this.currentUser.folioPermisoInicial === undefined) {
        this.formPermission.controls['invoice'].setValue(value);
      }
      else {
        this._snackBar.open('No tiene asignado este folio', '', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000
        });
        this.formPermission.controls['invoice'].setValue('');
      }
    }
  }

}
