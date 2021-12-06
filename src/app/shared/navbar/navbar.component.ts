import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _route: Router
  ) { }

  ngOnInit(): void {
  }

  public navigateTo(path: any){
    this._route.navigate([`/${path}`])
  }

  public navigateToExternalUrl(){
    window.location.href = "https://www.repuve-consultar.com/consulta-ciudadana";
  }
}
