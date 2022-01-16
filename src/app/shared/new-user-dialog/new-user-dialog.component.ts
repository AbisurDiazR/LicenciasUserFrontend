import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.scss']
})
export class NewUserDialogComponent implements OnInit {
  public userTypes = [
    {type: 'administrador', name: 'Administrador'},
    {type: 'comun', name: 'Usuario común'}
  ];
  public formUser!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<NewUserDialogComponent>,
    private _fb: FormBuilder,
    private _cuentasService: UsersService
  ) {
    this.formUser = this._fb.group({
      mensaje: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  public cancel(){
    this._dialogRef.close(false);
  }

  public create(){
    this._cuentasService.addMemorandum(this.data.id_cuenta, this.formUser.controls['mensaje'].value).then(() => {
      this._dialogRef.close(false);
    })
  }

}
