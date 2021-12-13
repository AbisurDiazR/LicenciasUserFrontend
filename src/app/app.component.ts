import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE } from './shared/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LicenciasUserFrontend';

  public constructor(
    private _navigation: Router,
    private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    private _translate: TranslateService,
    public firestore: AngularFirestore
  ){
    this._translate.setDefaultLang(DEFAULT_LANGUAGE);
    this._translate.use(DEFAULT_LANGUAGE);
    this._iconRegistry.addSvgIcon('ic-contact',this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/contact.svg'))
    .addSvgIcon('ic-procedure',this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/procedure.svg'))
    .addSvgIcon('ic-verify',this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/verify.svg'))
    .addSvgIcon('ic-facebook',this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg'))
    .addSvgIcon('ic-twitter',this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/twitter.svg'))
    .addSvgIcon('ic-linkedin',this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/linkedin.svg'))
    .addSvgIcon('ic-email',this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/ic-mail.svg'))
    .addSvgIcon('ic-time',this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/ic-time.svg'))
    .addSvgIcon('ic-location',this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/ic-location.svg'));
  }

  goToPermissions() { 
    this._navigation.navigate(['/tramites/permisos']);
  }

  goToLicenses() { 
    this._navigation.navigate(['/tramites/licencias']);
  }
}
