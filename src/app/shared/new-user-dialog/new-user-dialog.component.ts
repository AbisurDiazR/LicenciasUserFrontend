import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    private _fb: FormBuilder
  ) {
    this.formUser = this._fb.group({
      correo: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rol: new FormControl('', [Validators.required]),
      creator: new FormControl(''),
      creatorUid: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  public cancel(){
    this._dialogRef.close(false);
  }

  public create(){
    this.formUser.controls['creator'].setValue(this.data.user.nombre);
    this.formUser.controls['creatorUid'].setValue(localStorage.getItem('uid'));
    console.log(this.formUser.value);
  }

}
