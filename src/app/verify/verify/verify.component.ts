import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  public firstPeriod: boolean = true;
  public secondPeriod: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public changePeriod(){
    this.firstPeriod = !this.firstPeriod;
    this.secondPeriod = !this.secondPeriod;
  }
}
