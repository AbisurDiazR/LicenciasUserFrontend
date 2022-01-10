import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { NgxFileDropEntry } from 'ngx-file-drop/ngx-file-drop/ngx-file-drop-entry';
import { BannerService } from 'src/app/services/banner.service';
import { SNACK_BAR } from 'src/app/shared/data';

@Component({
  selector: 'app-webmaster',
  templateUrl: './webmaster.component.html',
  styleUrls: ['./webmaster.component.scss']
})
export class WebmasterComponent implements OnInit {
  progressOne: number = 0;
  showProgressOne: boolean = false;
  showFinishedOne: boolean = false;
  bannerNameOne!: any;
  filePathOne!: any;

  progressTwo: number = 0;
  showProgressTwo: boolean = false;
  showFinishedTwo: boolean = false;
  bannerNameTwo!: any;
  filePathTwo!: any;

  progressThree: number = 0;
  showProgressThree: boolean = false;
  showFinishedThree: boolean = false;
  bannerNameThree!: any;
  filePathThree!: any;

  bannersForm: FormGroup;
  bannerDoc!: any;
  lastUpdate!: any;
  downloadUrl!: any;

  constructor(
    private bannerService: BannerService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.bannersForm = this.formBuilder.group({
      levelOnebanner: ['', [Validators.required]],
      levelOneTitle: ['', [Validators.required]],
      levelTwobanner: ['', [Validators.required]],
      levelTwoTitle: ['', [Validators.required]],
      levelLowbanner: ['', [Validators.required]],
      levelLowTitle: ['', [Validators.required]],
      lastUpdate: []
    });
  }

  ngOnInit(): void {
    moment.locale('es-mx');
    this.setbanners();
  }

  setbanners() {
    this.bannerService.getUidDocument().then((res: any) => {
      res.docs.map((doc: any) => {
        this.bannerDoc = { id: doc.id, ...doc.data() };
        this.lastUpdate = moment(this.bannerDoc.lastUpdate).format('lll');
        this.bannerDoc.levelLowbanner === '' ? this.bannerDoc.levelLowbanner !== '' : this.filePathOne = this.bannerDoc.levelLowbanner;
        this.bannerDoc.levelLowbanner === '' ? this.bannerDoc.levelLowbanner !== '' : this.showFinishedOne = true;
        this.bannerDoc.levelLowTitle === '' ? this.bannerDoc.levelLowTitle !== '' : this.bannerNameOne = this.bannerDoc.levelLowTitle;
        this.bannerDoc.levelLowbanner === '' ? this.bannerDoc.levelLowbanner !== '' : this.bannersForm.controls['levelLowbanner'].setValue(this.bannerDoc.levelLowbanner);
        this.bannerDoc.levelLowTitle === '' ? this.bannerDoc.levelLowTitle !== '' : this.bannersForm.controls['levelLowTitle'].setValue(this.bannerDoc.levelLowTitle);

        this.bannerDoc.levelOnebanner === '' ? this.bannerDoc.levelOnebanner !== '' : this.filePathTwo = this.bannerDoc.levelOnebanner;
        this.bannerDoc.levelOnebanner === '' ? this.bannerDoc.levelOnebanner !== '' : this.showFinishedTwo = true;
        this.bannerDoc.levelOneTitle === '' ? this.bannerDoc.levelOneTitle !== '' : this.bannerNameTwo = this.bannerDoc.levelOneTitle;
        this.bannerDoc.levelOnebanner === '' ? this.bannerDoc.levelOnebanner !== '' : this.bannersForm.controls['levelOnebanner'].setValue(this.bannerDoc.levelOnebanner);
        this.bannerDoc.levelOneTitle === '' ? this.bannerDoc.levelOneTitle !== '' : this.bannersForm.controls['levelOneTitle'].setValue(this.bannerDoc.levelOneTitle);

        this.bannerDoc.levelTwobanner === '' ? this.bannerDoc.levelTwobanner !== '' : this.filePathThree = this.bannerDoc.levelTwobanner;
        this.bannerDoc.levelTwobanner === '' ? this.bannerDoc.levelTwobanner !== '' : this.showFinishedThree = true;
        this.bannerDoc.levelTwoTitle === '' ? this.bannerDoc.levelTwoTitle !== '' : this.bannerNameThree = this.bannerDoc.levelTwoTitle;
        this.bannerDoc.levelTwobanner === '' ? this.bannerDoc.levelTwobanner !== '' : this.bannersForm.controls['levelTwobanner'].setValue(this.bannerDoc.levelTwobanner);
        this.bannerDoc.levelTwoTitle === '' ? this.bannerDoc.levelTwoTitle !== '' : this.bannersForm.controls['levelTwoTitle'].setValue(this.bannerDoc.levelTwoTitle);
      })
    });
  }

  dropped(fileDrop: any) {
    let fileDropped = fileDrop[0];
    if (this.isFileAllowed(fileDropped.fileEntry.name)) {
      this.bannerNameOne = fileDropped.fileEntry.name;
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
              this.bannersForm.controls['levelLowbanner'].setValue(file);
              this.bannersForm.controls['levelLowTitle'].setValue(file.name);
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
      this.bannerNameTwo = fileDropped.fileEntry.name;
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
              this.bannersForm.controls['levelOnebanner'].setValue(file);
              this.bannersForm.controls['levelOneTitle'].setValue(file.name);
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

  droppedThree(fileDrop: any) {
    let fileDropped = fileDrop[0];
    if (this.isFileAllowed(fileDropped.fileEntry.name)) {
      this.bannerNameThree = fileDropped.fileEntry.name;
      const fileEntry = fileDropped.fileEntry as FileSystemFileEntry;
      const reader = new FileReader();

      fileEntry.file((file: File) => {
        if (this.isFileSizeAllowed(file.size)) {
          this.showProgressThree = true;
          this.progressThree = 0;
          setTimeout(() => {
            while (this.progressThree < 100) {
              this.progressThree++;
            }
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.bannersForm.controls['levelTwobanner'].setValue(file);
              this.bannersForm.controls['levelTwoTitle'].setValue(file.name);
              this.filePathThree = reader.result;
              setTimeout(() => {
                this.showProgressThree = false;
                this.showFinishedThree = true;
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

  snackBarbannerUpdated(){
    this.snackBar.open(SNACK_BAR.bannerUpdated, '', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'au-updated-snackbar'
    });    
  }

  isFileAllowed(fileName: string) {
    let isFileAllowed = false;
    const allowedFiles = ['.jpg', '.jpeg', '.png'];
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

  updatebanners() {
    const levelLowbanner = this.bannersForm.controls['levelLowbanner'].value;
    const levelOnebanner = this.bannersForm.controls['levelOnebanner'].value;
    const levelTwobanner = this.bannersForm.controls['levelTwobanner'].value;
    levelLowbanner.name !== undefined ? this.updatebannerCollection(levelLowbanner, 'levelLowbanner', 'levelLowTitle') : this.bannersForm.controls['levelLowbanner'].setValue(levelLowbanner);
    levelOnebanner.name !== undefined ? this.updatebannerCollection(levelOnebanner, 'levelOnebanner', 'levelOneTitle') : this.bannersForm.controls['levelOnebanner'].setValue(levelOnebanner);
    levelTwobanner.name !== undefined ? this.updatebannerCollection(levelTwobanner, 'levelTwobanner', 'levelTwoTitle') : this.bannersForm.controls['levelTwobanner'].setValue(levelTwobanner);    
  }
  updatebannerCollection(value: File, field: any, title: any) {
    if (value.name !== undefined) {
      this.bannerService.uploadPhoto(`banners/${value.name}`, value);
      this.bannerService.getRefStorage(`banners/${value.name}`).getDownloadURL().subscribe((url: any) => {
        this.bannersForm.controls[`${title}`].setValue(value.name);
        this.bannersForm.controls[`${field}`].setValue(url);
        this.bannersForm.controls['lastUpdate'].setValue(new Date());
        let updateObject = JSON.parse(JSON.stringify(this.bannersForm.value));
        this.lastUpdate = moment(this.bannersForm.controls['lastUpdate'].value).format('lll');
        this.bannerService.updateDocument(this.bannerDoc.id, updateObject).then(() => {
          this.snackBarbannerUpdated();
          this.setbanners();
        });
      });      
    } else {
      alert(`${title} ${value}`);
      this.setbanners();
    }
  }

  deleteImageOne() {
    this.showFinishedOne = false;
    this.progressOne = 0;
    this.filePathOne = undefined;
    this.bannersForm.controls['levelLowbanner'].setValue('');
    this.bannersForm.controls['levelLowTitle'].setValue(this.bannerNameOne);
  }

  deleteImageTwo() {
    this.showFinishedTwo = false;
    this.progressTwo = 0;
    this.filePathTwo = undefined;
    this.bannersForm.controls['levelOnebanner'].setValue('');
    this.bannersForm.controls['levelOneTitle'].setValue(this.bannerNameTwo);
  }

  deleteImageThree() {
    this.showFinishedThree = false;
    this.progressThree = 0;
    this.filePathThree = undefined;
    this.bannersForm.controls['levelTwobanner'].setValue('');
    this.bannersForm.controls['levelTwoTitle'].setValue(this.bannerNameThree);
  }

}
