import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { DEFAULT_LANGUAGE } from './shared/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'LicenciasUserFrontend';
  user: any;
  userData: boolean = false;

  public constructor(
    private _navigation: Router,
    private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    private _translate: TranslateService,
    public firestore: AngularFirestore,
    public loginService: AuthService
  ) {
    this._translate.setDefaultLang(DEFAULT_LANGUAGE);
    this._translate.use(DEFAULT_LANGUAGE);
    this._iconRegistry.addSvgIcon('ic-contact', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/contact.svg'))
      .addSvgIcon('ic-procedure', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/procedure.svg'))
      .addSvgIcon('ic-verify', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/verify.svg'))
      .addSvgIcon('ic-facebook', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg'))
      .addSvgIcon('ic-twitter', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/twitter.svg'))
      .addSvgIcon('ic-linkedin', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/linkedin.svg'))
      .addSvgIcon('ic-email', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/ic-mail.svg'))
      .addSvgIcon('ic-time', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/ic-time.svg'))
      .addSvgIcon('ic-location', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/ic-location.svg'))
      .addSvgIcon('ic-users', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/ic-users.svg'))
      .addSvgIcon('ic-licenses', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/ic-licenses.svg'))
      .addSvgIcon('ic-user', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/ic-user.svg'))
      .addSvgIcon('ic-group', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/ic-group.svg'))
      .addSvgIcon('ic-down', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/ic-down.svg'))
      .addSvgIcon('ic-menu', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/3-points.svg'))
      .addSvgIcon('ic-search', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/search.svg'))
      .addSvgIcon('ic-logout', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/logout.svg'))
      .addSvgIcon('ic-folio', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/ic-folios.svg'))
      .addSvgIcon('ic-eye-closed', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/eye-close.svg'))
      .addSvgIcon('ic-eye-open', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/eye-open.svg'))
      .addSvgIcon('ic-certified', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/ic-certified.svg'))
      .addSvgIcon('ic-doc', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/ic-doc.svg'))
      .addSvgIcon('ic-permission', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/ic-permission.svg'))
      .addSvgIcon('ic-uploaded', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/atoms-icons-toast-check-blueturquesa.svg'))
      .addSvgIcon('ic-picture-start', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/atoms-icons-general-image-start.svg'))
      .addSvgIcon('ic-picture', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/atoms-icons-general-image.svg'))
      .addSvgIcon('ic-delete', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/atoms-icons-imagenes-off.svg'))
      .addSvgIcon('ic-picture-on', this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/atoms-icons-general-image-on.svg'));
  }
  ngOnInit(): void {
    this.loginService.getUserById(localStorage.getItem('uid')).subscribe((usr: any) => {
      this.user = { uid: usr.id, ...usr.data() };
      this._navigation.navigate(['/control/usuarios']);
      this.userData = true;
    }, err => {
      console.log(err);
    });
  }

  goToPermissions() {
    this._navigation.navigate(['/tramites/permisos']);
  }

  goToLicenses() {
    this._navigation.navigate(['/tramites/licencias']);
  }

  public logout() {
    this.loginService.logout();
    this._navigation.navigate(['/inicio']);
  }
}
