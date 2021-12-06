import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public slides = [
    { src: "https://www.revistaneo.com/sites/default/files/2019-12/5-marcas-de-autos-que-crecieron-en-mexico.jpg" },
    { src: "https://www.concanaco.com.mx/wp-content/uploads/2018/01/autos-mas-vendidos-Mexico.jpg" },
    { src: "https://images.kavak.services/mx/assets/images/price-guide/jpg/price-guide-hero-sm.jpg" },
    { src: "https://cdn2.atraccion360.com/media/aa/styles/xlarge/public/images/2017/07/zacua02galeria.jpg" }
  ];

  constructor(
    private _route: Router
  ) { }

  ngOnInit(): void {
  }

  public navigateTo(path: any){
    this._route.navigate([`/${path}`])
  }
  
}
