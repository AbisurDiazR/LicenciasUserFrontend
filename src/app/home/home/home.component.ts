import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public slides = [];

  constructor(
    private _route: Router,
    private _bannerService: BannerService
  ) { }

  ngOnInit(): void {
    this.setBanners();
  }
  
  setBanners() {
    let dataObject!: any;
    this._bannerService.getUidDocument().then((res: any) => {
      res.forEach((doc: any) => {
        dataObject = [
          {title: doc.data().levelLowTitle, src: doc.data().levelLowbanner},
          {title: doc.data().levelOneTitle, src: doc.data().levelOnebanner},
          {title: doc.data().levelTwoTitle, src: doc.data().levelTwobanner}
        ];
      });
      this.slides = dataObject;
    });
  }

  public navigateTo(path: any){
    this._route.navigate([`/${path}`])
  }
  
}
