import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PdfMakeWrapper, QR } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss']
})
export class LicensesComponent implements OnInit {
  public formLicenses!: any;

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
  }

  public save() {
    console.log(this.formLicenses.value);
    const pdf = new PdfMakeWrapper();
    const qr = new QR('my code').fit(100).end;
    PdfMakeWrapper.setFonts(pdfFonts);
    pdf.add(
      `Nombre; ${this.formLicenses.controls.name.value}`+'\n'+
      `Apellidos; ${this.formLicenses.controls.lastName.value}`+'\n'+
      `Fecha de nacimiento; ${this.formLicenses.controls.birthDate.value}`+'\n'+
      `Curp; ${this.formLicenses.controls.curp.value}`+'\n'+
      `Tipo de sangre; ${this.formLicenses.controls.bloodType.value}`+'\n'+
      `Alergias; ${this.formLicenses.controls.alergies.value}`+'\n'+
      `Nacionalidad; ${this.formLicenses.controls.nationality.value}`+'\n'+
      `Calle; ${this.formLicenses.controls.street.value}`+'\n'+
      `Colonia; ${this.formLicenses.controls.colony.value}`+'\n'+
      `Ciudad; ${this.formLicenses.controls.city.value}`+'\n'+
      `Estado; ${this.formLicenses.controls.estate.value}`+'\n'+
      `Nombre de contacto; ${this.formLicenses.controls.contactName.value}`+'\n'+
      `Telefono de contacto; ${this.formLicenses.controls.contactPhone.value}`+'\n'+
      `Tipo de licencia; ${this.formLicenses.controls.type.value}`+'\n'+
      `Validez; ${this.formLicenses.controls.validity.value}`+'\n'+
      `Fecha de expedición; ${this.formLicenses.controls.expeditionDate.value}`      
    );
    pdf.add(qr);
    pdf.create().download();
  }

}
