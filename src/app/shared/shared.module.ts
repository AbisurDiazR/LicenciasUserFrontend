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

import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

@NgModule({
  declarations: [
    CarouselComponent,
    FooterComponent,
    NavbarComponent
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
    MatButtonModule
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
    MatButtonModule
  ]
})
export class SharedModule { }
