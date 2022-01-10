import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { ESTATES, FORMATS, TYPES, TYPE_BLOOD, VALIDTY } from '../data';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss']
})
export class LicensesComponent implements OnInit {
  public formLicenses!: any;
  public bloods = TYPE_BLOOD;
  public states = ESTATES;
  public typeLicenses = TYPES;
  public validitys = VALIDTY;
  public tmpValue = '';
  public formats = FORMATS;

  constructor(
    private _fb: FormBuilder
  ) {
    this.formLicenses = this._fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      curp: ['', [Validators.required]],
      bloodType: ['', [Validators.required]],
      alergies: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      street: ['', [Validators.required]],
      colony: ['', [Validators.required]],
      city: ['', [Validators.required]],
      estate: ['', [Validators.required]],
      contactName: ['', [Validators.required]],
      contactPhone: ['', [Validators.required]],
      type: ['', [Validators.required]],
      validity: ['', [Validators.required]],
      expeditionDate: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    moment.locale('es');
    this.formLicenses.controls['alergies'].setValue('NINGUNA');
    this.formLicenses.controls['expeditionDate'].setValue(moment().format('L'));
  }

  public save() {
  }

  public setMinorType(){
    if(this.formLicenses.controls['type'].value === 'Permiso de menor'){
      this.validitys.push('6 Meses');
      this.formLicenses.controls['validity'].setValue('6 Meses');
    }
  }

  compareCategoryObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

}
