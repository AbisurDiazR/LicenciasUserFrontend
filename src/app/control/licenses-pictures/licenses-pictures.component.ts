import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { FormatosService} from 'src/app/services/formatos.service';
import { SNACK_BAR } from 'src/app/shared/data';

@Component({
  selector: 'app-licenses-pictures',
  templateUrl: './licenses-pictures.component.html',
  styleUrls: ['./licenses-pictures.component.scss']
})
export class LicensesPicturesComponent implements OnInit {
  progressOne: number = 0;
  showProgressOne: boolean = false;
  showFinishedOne: boolean = false;
  formatoNameOne!: any;
  filePathOne!: any;

  progressTwo: number = 0;
  showProgressTwo: boolean = false;
  showFinishedTwo: boolean = false;
  formatoNameTwo!: any;
  filePathTwo!: any;

  progressThree: number = 0;
  showProgressThree: boolean = false;
  showFinishedThree: boolean = false;
  formatoNameThree!: any;
  filePathThree!: any;

  progressFour: number = 0;
  showProgressFour: boolean = false;
  showFinishedFour: boolean = false;
  formatoNameFour!: any;
  filePathFour!: any;

  formatosForm!: FormGroup;
  formatoDoc!: any;
  lastUpdate!: any;
  downloadUrl!: any;

  constructor(
    private formatoService: FormatosService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.formatosForm = this.formBuilder.group({
      levelOneformato: ['', [Validators.required]],
      levelOneTitle: ['', [Validators.required]],
      levelLowformato: ['', [Validators.required]],
      levelLowTitle: ['', [Validators.required]],
      levelTwoformato: ['', [Validators.required]],
      levelTwoTitle: ['', [Validators.required]],
      levelThreeformato: ['', [Validators.required]],
      levelThreeTitle: ['', [Validators.required]],
      lastUpdate: []
    });
  }

  ngOnInit(): void {
    moment.locale('es-mx');
    this.setformatos();
  }

  setformatos() {
    this.formatoService.getUidDocument().then((res: any) => {
      res.docs.map((doc: any) => {
        this.formatoDoc = { id: doc.id, ...doc.data() };
        console.log(this.formatoDoc);
        this.lastUpdate = moment(this.formatoDoc.lastUpdate).format('lll');
        this.formatoDoc.levelLowformato === '' ? this.formatoDoc.levelLowformato !== '' : this.filePathOne = this.formatoDoc.levelLowformato;
        this.formatoDoc.levelLowformato === '' ? this.formatoDoc.levelLowformato !== '' : this.showFinishedOne = true;
        this.formatoDoc.levelLowTitle === '' ? this.formatoDoc.levelLowTitle !== '' : this.formatoNameOne = this.formatoDoc.levelLowTitle;
        this.formatoDoc.levelLowformato === '' ? this.formatoDoc.levelLowformato !== '' : this.formatosForm.controls['levelLowformato'].setValue(this.formatoDoc.levelLowformato);
        this.formatoDoc.levelLowTitle === '' ? this.formatoDoc.levelLowTitle !== '' : this.formatosForm.controls['levelLowTitle'].setValue(this.formatoDoc.levelLowTitle);

        this.formatoDoc.levelOneformato === '' ? this.formatoDoc.levelOneformato !== '' : this.filePathTwo = this.formatoDoc.levelOneformato;
        this.formatoDoc.levelOneformato === '' ? this.formatoDoc.levelOneformato !== '' : this.showFinishedTwo = true;
        this.formatoDoc.levelOneTitle === '' ? this.formatoDoc.levelOneTitle !== '' : this.formatoNameTwo = this.formatoDoc.levelOneTitle;
        this.formatoDoc.levelOneformato === '' ? this.formatoDoc.levelOneformato !== '' : this.formatosForm.controls['levelOneformato'].setValue(this.formatoDoc.levelOneformato);
        this.formatoDoc.levelOneTitle === '' ? this.formatoDoc.levelOneTitle !== '' : this.formatosForm.controls['levelOneTitle'].setValue(this.formatoDoc.levelOneTitle);

        this.formatoDoc.levelTwoformato === '' ? this.formatoDoc.levelTwoformato !== '' : this.filePathThree = this.formatoDoc.levelTwoformato;
        this.formatoDoc.levelTwoformato === '' ? this.formatoDoc.levelTwoformato !== '' : this.showFinishedThree = true;
        this.formatoDoc.levelTwoTitle === '' ? this.formatoDoc.levelTwoTitle !== '' : this.formatoNameThree = this.formatoDoc.levelTwoTitle;
        this.formatoDoc.levelTwoformato === '' ? this.formatoDoc.levelTwoformato !== '' : this.formatosForm.controls['levelTwoformato'].setValue(this.formatoDoc.levelTwoformato);
        this.formatoDoc.levelTwoTitle === '' ? this.formatoDoc.levelTwoTitle !== '' : this.formatosForm.controls['levelTwoTitle'].setValue(this.formatoDoc.levelTwoTitle);

        this.formatoDoc.levelThreeformato === '' ? this.formatoDoc.levelThreeformato !== '' : this.filePathFour = this.formatoDoc.levelThreeformato;
        this.formatoDoc.levelThreeformato === '' ? this.formatoDoc.levelThreeformato !== '' : this.showFinishedFour = true;
        this.formatoDoc.levelThreeTitle === '' ? this.formatoDoc.levelThreeTitle !== '' : this.formatoNameFour = this.formatoDoc.levelThreeTitle;
        this.formatoDoc.levelThreeformato === '' ? this.formatoDoc.levelThreeformato !== '' : this.formatosForm.controls['levelThreeformato'].setValue(this.formatoDoc.levelThreeformato);
        this.formatoDoc.levelThreeTitle === '' ? this.formatoDoc.levelThreeTitle !== '' : this.formatosForm.controls['levelThreeTitle'].setValue(this.formatoDoc.levelThreeTitle);
      })
    });
  }

  dropped(fileDrop: any) {
    let fileDropped = fileDrop[0];
    if (this.isFileAllowed(fileDropped.fileEntry.name)) {
      this.formatoNameOne = fileDropped.fileEntry.name;
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
              this.formatosForm.controls['levelLowformato'].setValue(file);
              this.formatosForm.controls['levelLowTitle'].setValue(file.name);
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
      this.formatoNameTwo = fileDropped.fileEntry.name;
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
              this.formatosForm.controls['levelOneformato'].setValue(file);
              this.formatosForm.controls['levelOneTitle'].setValue(file.name);
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
      this.formatoNameThree = fileDropped.fileEntry.name;
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
              this.formatosForm.controls['levelTwoformato'].setValue(file);
              this.formatosForm.controls['levelTwoTitle'].setValue(file.name);
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

  droppedFour(fileDrop: any) {
    let fileDropped = fileDrop[0];
    if (this.isFileAllowed(fileDropped.fileEntry.name)) {
      this.formatoNameFour = fileDropped.fileEntry.name;
      const fileEntry = fileDropped.fileEntry as FileSystemFileEntry;
      const reader = new FileReader();

      fileEntry.file((file: File) => {
        if (this.isFileSizeAllowed(file.size)) {
          this.showProgressFour = true;
          this.progressFour = 0;
          setTimeout(() => {
            while (this.progressFour < 100) {
              this.progressFour++;
            }
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.formatosForm.controls['levelThreeformato'].setValue(file);
              this.formatosForm.controls['levelThreeTitle'].setValue(file.name);
              this.filePathFour = reader.result;
              setTimeout(() => {
                this.showProgressFour = false;
                this.showFinishedFour = true;
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

  snackBarformatoUpdated(){
    this.snackBar.open(SNACK_BAR.formatoUpdated, '', {
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

  updateformatos() {
    const levelLowformato = this.formatosForm.controls['levelLowformato'].value;
    const levelOneformato = this.formatosForm.controls['levelOneformato'].value;
    const levelTwoformato = this.formatosForm.controls['levelTwoformato'].value;
    const levelThreeformato = this.formatosForm.controls['levelThreeformato'].value;
    levelLowformato.name !== undefined ? this.updateformatoCollection(levelLowformato, 'levelLowformato', 'levelLowTitle') : this.formatosForm.controls['levelLowformato'].setValue(levelLowformato);
    levelOneformato.name !== undefined ? this.updateformatoCollection(levelOneformato, 'levelOneformato', 'levelOneTitle') : this.formatosForm.controls['levelOneformato'].setValue(levelOneformato);
    levelTwoformato.name !== undefined ? this.updateformatoCollection(levelTwoformato, 'levelTwoformato', 'levelTwoTitle') : this.formatosForm.controls['levelTwoformato'].setValue(levelTwoformato);
    levelThreeformato.name !== undefined ? this.updateformatoCollection(levelThreeformato, 'levelThreeformato', 'levelThreeTitle') : this.formatosForm.controls['levelThreeformato'].setValue(levelThreeformato);
  }
  updateformatoCollection(value: File, field: any, title: any) {
    if (value.name !== undefined) {
      this.formatoService.uploadPhoto(`formatos/${value.name}`, value);
      this.formatoService.getRefStorage(`formatos/${value.name}`).getDownloadURL().subscribe((url: any) => {
        this.formatosForm.controls[`${title}`].setValue(value.name);
        this.formatosForm.controls[`${field}`].setValue(url);
        this.formatosForm.controls['lastUpdate'].setValue(new Date());
        let updateObject = JSON.parse(JSON.stringify(this.formatosForm.value));
        this.lastUpdate = moment(this.formatosForm.controls['lastUpdate'].value).format('lll');
        this.formatoService.updateDocument(this.formatoDoc.id, updateObject).then(() => {
          this.snackBarformatoUpdated();
          this.setformatos();
        });
      });      
    } else {
      alert(`${title} ${value}`);
      this.setformatos();
    }
  }

  deleteImageOne() {
    this.showFinishedOne = false;
    this.progressOne = 0;
    this.filePathOne = undefined;
    this.formatosForm.controls['levelLowformato'].setValue('');
    this.formatosForm.controls['levelLowTitle'].setValue(this.formatoNameOne);
  }

  deleteImageTwo() {
    this.showFinishedTwo = false;
    this.progressTwo = 0;
    this.filePathTwo = undefined;
    this.formatosForm.controls['levelOneformato'].setValue('');
    this.formatosForm.controls['levelOneTitle'].setValue(this.formatoNameTwo);
  }

  deleteImageThree() {
    this.showFinishedThree = false;
    this.progressThree = 0;
    this.filePathThree = undefined;
    this.formatosForm.controls['levelTwoformato'].setValue('');
    this.formatosForm.controls['levelTwoTitle'].setValue(this.formatoNameOne);
  }

  deleteImageFour() {
    this.showFinishedFour = false;
    this.progressFour = 0;
    this.filePathFour = undefined;
    this.formatosForm.controls['levelThreeformato'].setValue('');
    this.formatosForm.controls['levelThreeTitle'].setValue(this.formatoNameTwo);
  }

}
