import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CroppedEvent } from 'ngx-photo-editor';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { AuthService } from 'src/app/services/auth.service';
import { LicenciasService } from 'src/app/services/licencias.service';
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
  public options = ['No especifico','Si','No'];
  public formPictures!: FormGroup;

  public fileFotoFirma!: any;
  public fileFotoContribuyent!: any;
  public urlFotoFirma!: any;
  public urlFotoContribuyent!: any;

  imageChangedEvent: any;
  base64: any;

  imageChangedEventDos: any;
  base64Dos: any;
  public user!: any;
  public isReadOnly: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _licenciaService: LicenciasService,
    private _navigation: Router,
    private _loginService: AuthService
  ) { }

  ngOnInit(): void {
    this.setUer();
    this.formLicenses = this._formBuilder.group({
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
      expeditionDate: ['', [Validators.required]],
      format: ['', [Validators.required]],
      donate: ['',[Validators.required]]
    });
    this.formPictures = this._formBuilder.group({
      photoTaxpayer: ['', [Validators.required]],
      photoFirm: ['', [Validators.required]]
    });
    moment.locale('es');
    this.formLicenses.controls['alergies'].setValue('NINGUNA');
    this.formLicenses.controls['expeditionDate'].setValue(moment().format('L'));
    this.formLicenses.controls['nationality'].setValue('Mexicano');
  }
  public setUer() {
    this._loginService.getUserById(localStorage.getItem('uid')).subscribe((usr: any) => {
      this.user = { uid: usr.id, ...usr.data() };
      if (this.user.rol === 'administrador') {
        this.isReadOnly = false;
      }
      if (this.user.rol === 'director') {
        this.isReadOnly = false;
      }
    }, err => {
      console.log(err);
    });
  }

  public async save() {
    let licenseObject = {
      name: this.formLicenses.controls['name'].value,
      lastName: this.formLicenses.controls['lastName'].value,
      birthDate: this.formLicenses.controls['birthDate'].value,
      curp: this.formLicenses.controls['curp'].value,
      bloodType: this.formLicenses.controls['bloodType'].value,
      alergies: this.formLicenses.controls['alergies'].value,
      nationality: this.formLicenses.controls['nationality'].value,
      street: this.formLicenses.controls['street'].value,
      colony: this.formLicenses.controls['colony'].value,
      city: this.formLicenses.controls['city'].value,
      estate: this.formLicenses.controls['estate'].value,
      contactName: this.formLicenses.controls['contactName'].value,
      contactPhone: this.formLicenses.controls['contactPhone'].value,
      type: this.formLicenses.controls['type'].value,
      validity: this.formLicenses.controls['validity'].value,
      expeditionDate: this.formLicenses.controls['expeditionDate'].value,
      format: this.formLicenses.controls['format'].value,
      photo: await this.uploadImage(this.fileFotoContribuyent.name, this.fileFotoContribuyent),
      firm: await this.uploadImage(this.fileFotoFirma.name, this.fileFotoFirma),
      creator: localStorage.getItem('uid'),
      folio: await this.generateFolio(),
      expirationDate: moment(this.addDaysToDate(new Date(), 30)).format('L'),
      donate: this.formLicenses.controls['donate'].value
    };
    try{
      await this._licenciaService.saveLicencia(licenseObject).then((docRef) => {
        this._navigation.navigate([`control/alta-licencia/${docRef.id}`]);
      });      
    }catch(err: any){
      console.log(err);
    }
  }

  public addDaysToDate(date: any, days: any) {
    var res = new Date(date);
    res.setDate(res.getDate() + days);
    return res;
  }

  public async generateFolio() {
    const folio = await this._licenciaService.getLicencias().ref.get().then(snapshot => {
      if (snapshot.empty) {
        return 'GR001'
      }else{
        return `GR00${snapshot.size + 1}`
      }
    });
    return folio;
  }

  public async uploadImage(name: any, file: any) {
    try {
      let ref = (await this._licenciaService.uploadPhoto(`contribuyentes/${name}`, file))
      let urlDownloadImage = await ref.getDownloadURL();
      console.log(urlDownloadImage);
      return urlDownloadImage;
    } catch (exception) {
      console.log("exception " + exception)
      return exception;
    }
  }

  public setMinorType() {
    if (this.formLicenses.controls['type'].value === 'Permiso de menor') {
      this.validitys.push('6 Meses');
      this.formLicenses.controls['validity'].setValue('6 Meses');
    }
  }

  compareCategoryObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

  fileChangeEvent(event: any) {
    this.imageChangedEvent = event;
  }

  imageCropped(event: CroppedEvent) {
    this.fileFotoContribuyent = event.file;
    this.base64 = event.base64;
  }

  fileChangeEventDos(event: any) {
    this.imageChangedEventDos = event;
  }

  imageCroppedDos(event: CroppedEvent) {
    this.fileFotoFirma = event.file;
    this.base64Dos = event.base64;
  }

}
