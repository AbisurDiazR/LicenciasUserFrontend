import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogosService } from 'src/app/services/logos.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public transitoMunicipal: any = '';

  constructor(
    private _route: Router,
    private _logos: LogosService
  ) { }

  ngOnInit(): void {
    this.getLogoTransito();
  }
  getLogoTransito() {
    this._logos.getUidDocument().then((res: any) => {
      res.forEach((doc: any) => {
        let logoObject = {
          left: doc.data().levelLowlogo,
          right: doc.data().levelOnelogo
        }
        this.transitoMunicipal = logoObject.right;     
      });
    });
  }

  public navigateTo(path: any){
    this._route.navigate([`/${path}`])
  }

  public navigateToExternalUrl(){
    window.location.href = "https://www.repuve-consultar.com/consulta-ciudadana";
  }
}
