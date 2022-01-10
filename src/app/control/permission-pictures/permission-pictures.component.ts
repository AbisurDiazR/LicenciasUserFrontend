import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { LogosService } from 'src/app/services/logos.service';
import { SNACK_BAR } from 'src/app/shared/data';

@Component({
  selector: 'app-permission-pictures',
  templateUrl: './permission-pictures.component.html',
  styleUrls: ['./permission-pictures.component.scss']
})
export class PermissionPicturesComponent implements OnInit {
  progressOne: number = 0;
  showProgressOne: boolean = false;
  showFinishedOne: boolean = false;
  logoNameOne!: any;
  filePathOne!: any;

  progressTwo: number = 0;
  showProgressTwo: boolean = false;
  showFinishedTwo: boolean = false;
  logoNameTwo!: any;
  filePathTwo!: any;

  logosForm!: FormGroup;
  logoDoc!: any;
  lastUpdate!: any;
  downloadUrl!: any;

  constructor(
    private logoService: LogosService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { 
    this.logosForm = this.formBuilder.group({
      levelOnelogo: ['', [Validators.required]],
      levelOneTitle: ['', [Validators.required]],
      levelLowlogo: ['', [Validators.required]],
      levelLowTitle: ['', [Validators.required]],
      lastUpdate: []
    });
  }

  ngOnInit(): void {    
    moment.locale('es-mx');
    this.setlogos();
  }

  setlogos() {
    this.logoService.getUidDocument().then((res: any) => {
      res.docs.map((doc: any) => {
        this.logoDoc = { id: doc.id, ...doc.data() };
        this.lastUpdate = moment(this.logoDoc.lastUpdate).format('lll');
        this.logoDoc.levelLowlogo === '' ? this.logoDoc.levelLowlogo !== '' : this.filePathOne = this.logoDoc.levelLowlogo;
        this.logoDoc.levelLowlogo === '' ? this.logoDoc.levelLowlogo !== '' : this.showFinishedOne = true;
        this.logoDoc.levelLowTitle === '' ? this.logoDoc.levelLowTitle !== '' : this.logoNameOne = this.logoDoc.levelLowTitle;
        this.logoDoc.levelLowlogo === '' ? this.logoDoc.levelLowlogo !== '' : this.logosForm.controls['levelLowlogo'].setValue(this.logoDoc.levelLowlogo);
        this.logoDoc.levelLowTitle === '' ? this.logoDoc.levelLowTitle !== '' : this.logosForm.controls['levelLowTitle'].setValue(this.logoDoc.levelLowTitle);

        this.logoDoc.levelOnelogo === '' ? this.logoDoc.levelOnelogo !== '' : this.filePathTwo = this.logoDoc.levelOnelogo;
        this.logoDoc.levelOnelogo === '' ? this.logoDoc.levelOnelogo !== '' : this.showFinishedTwo = true;
        this.logoDoc.levelOneTitle === '' ? this.logoDoc.levelOneTitle !== '' : this.logoNameTwo = this.logoDoc.levelOneTitle;
        this.logoDoc.levelOnelogo === '' ? this.logoDoc.levelOnelogo !== '' : this.logosForm.controls['levelOnelogo'].setValue(this.logoDoc.levelOnelogo);
        this.logoDoc.levelOneTitle === '' ? this.logoDoc.levelOneTitle !== '' : this.logosForm.controls['levelOneTitle'].setValue(this.logoDoc.levelOneTitle);
      })
    });
  }

  dropped(fileDrop: any) {
    let fileDropped = fileDrop[0];
    if (this.isFileAllowed(fileDropped.fileEntry.name)) {
      this.logoNameOne = fileDropped.fileEntry.name;
      const fileEntry = fileDropped.fileEntry as FileSystemFileEntry;
      const reader = new FileReader();

      fileEntry.file((file: File) => {
        if (this.isFileSizeAllowed(file.size)) {
          this.showProgressOne = true;
          this.progressOne = 0;
          setTimeout(() => {
            while (this.progressOne < 100) {
              this.progressOne++;
            }
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.logosForm.controls['levelLowlogo'].setValue(file);
              this.logosForm.controls['levelLowTitle'].setValue(file.name);
              this.filePathOne = reader.result;
              setTimeout(() => {
                this.showProgressOne = false;
                this.showFinishedOne = true;
              }, 2000);
            };
          }, 1500);
        } else {
          this.snackbarNotSize();
        }
      });
    } else {
      this.snackbarNotAllowed();
    }
  }

  droppedTwo(fileDrop: any) {
    let fileDropped = fileDrop[0];
    if (this.isFileAllowed(fileDropped.fileEntry.name)) {
      this.logoNameTwo = fileDropped.fileEntry.name;
      const fileEntry = fileDropped.fileEntry as FileSystemFileEntry;
      const reader = new FileReader();

      fileEntry.file((file: File) => {
        if (this.isFileSizeAllowed(file.size)) {
          this.showProgressTwo = true;
          this.progressTwo = 0;
          setTimeout(() => {
            while (this.progressTwo < 100) {
              this.progressTwo++;
            }
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.logosForm.controls['levelOnelogo'].setValue(file);
              this.logosForm.controls['levelOneTitle'].setValue(file.name);
              this.filePathTwo = reader.result;
              setTimeout(() => {
                this.showProgressTwo = false;
                this.showFinishedTwo = true;
              }, 2000);
            };
          }, 1500);
        } else {
          this.snackbarNotSize();
        }
      });
    } else {
      this.snackbarNotAllowed();
    }
  }

  snackbarNotAllowed() {
    this.snackBar.open(SNACK_BAR.notAllowedFormat, '', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'au-deleted-snackbar'
    });
  }

  snackbarNotSize() {
    this.snackBar.open(SNACK_BAR.notAllowedSize, '', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'au-deleted-snackbar'
    });
  }

  snackBarlogoUpdated(){
    this.snackBar.open(SNACK_BAR.logoUpdated, '', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'au-updated-snackbar'
    });    
  }

  isFileAllowed(fileName: string) {
    let isFileAllowed = false;
    const allowedFiles = ['.jpg', '.jpeg', '.png', '.PNG'];
    const regex = /(?:\.([^.]+))?$/;
    const extension = regex.exec(fileName);
    if (extension !== undefined && extension !== null) {
      for (const ext of allowedFiles) {
        if (ext === extension[0]) {
          isFileAllowed = true;
        }
      }
    }
    return isFileAllowed;
  }

  isFileSizeAllowed(size: any) {
    return size < 1700000;
  }

  updatelogos() {
    const levelLowlogo = this.logosForm.controls['levelLowlogo'].value;
    const levelOnelogo = this.logosForm.controls['levelOnelogo'].value;
    levelLowlogo.name !== undefined ? this.updatelogoCollection(levelLowlogo, 'levelLowlogo', 'levelLowTitle') : this.logosForm.controls['levelLowlogo'].setValue(levelLowlogo);
    levelOnelogo.name !== undefined ? this.updatelogoCollection(levelOnelogo, 'levelOnelogo', 'levelOneTitle') : this.logosForm.controls['levelOnelogo'].setValue(levelOnelogo);
  }
  updatelogoCollection(value: File, field: any, title: any) {
    if (value.name !== undefined) {
      this.logoService.uploadPhoto(`logos/${value.name}`, value);
      this.logoService.getRefStorage(`logos/${value.name}`).getDownloadURL().subscribe((url: any) => {
        this.logosForm.controls[`${title}`].setValue(value.name);
        this.logosForm.controls[`${field}`].setValue(url);
        this.logosForm.controls['lastUpdate'].setValue(new Date());
        let updateObject = JSON.parse(JSON.stringify(this.logosForm.value));
        this.lastUpdate = moment(this.logosForm.controls['lastUpdate'].value).format('lll');
        this.logoService.updateDocument(this.logoDoc.id, updateObject).then(() => {
          this.snackBarlogoUpdated();
          this.setlogos();
        });
      });      
    } else {
      alert(`${title} ${value}`);
      this.setlogos();
    }
  }

  deleteImageOne() {
    this.showFinishedOne = false;
    this.progressOne = 0;
    this.filePathOne = undefined;
    this.logosForm.controls['levelLowlogo'].setValue('');
    this.logosForm.controls['levelLowTitle'].setValue(this.logoNameOne);
  }

  deleteImageTwo() {
    this.showFinishedTwo = false;
    this.progressTwo = 0;
    this.filePathTwo = undefined;
    this.logosForm.controls['levelOnelogo'].setValue('');
    this.logosForm.controls['levelOneTitle'].setValue(this.logoNameTwo);
  }

}
