import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

//Angular Material
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewUserDialogComponent } from './new-user-dialog/new-user-dialog.component';

import { NgxFileDropModule } from 'ngx-file-drop';
import { PermissionsComponent } from './permissions/permissions.component';
import { LicensesComponent } from './licenses/licenses.component';

import { NgxNumToWordsModule } from 'ngx-num-to-words';
import { MemorandumDialogComponent } from './memorandum-dialog/memorandum-dialog.component';

import { NgxPhotoEditorModule } from 'ngx-photo-editor';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

@NgModule({
  declarations: [
    CarouselComponent,
    FooterComponent,
    NavbarComponent,
    NewUserDialogComponent,
    PermissionsComponent,
    LicensesComponent,
    MemorandumDialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    MatMenuModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatListModule,
    MatStepperModule,
    CdkStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    MatTableModule,
    MatDialogModule,
    NgxFileDropModule,
    MatCheckboxModule,
    MatMenuModule,
    MatCardModule,
    NgxNumToWordsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    NgxPhotoEditorModule
  ],
  exports: [
    HttpClientModule,
    TranslateModule,
    FooterComponent,
    NavbarComponent,
    CarouselComponent,
    MatMenuModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatListModule,
    MatStepperModule,
    CdkStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    MatTableModule,
    MatDialogModule,
    NewUserDialogComponent,
    NgxFileDropModule,
    PermissionsComponent,
    LicensesComponent,
    MatCheckboxModule,
    MatMenuModule,
    MatCardModule,
    NgxNumToWordsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    NgxPhotoEditorModule
  ]
})
export class SharedModule { }
