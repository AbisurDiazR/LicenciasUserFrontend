import { Component, OnInit, ViewChild } from '@angular/core';
import { COUNTRIES, ESTATES, FORMATS, TYPES, TYPE_BLOOD, VALIDTY } from 'src/app/shared/data';
import { MatHorizontalStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss']
})
export class LicensesComponent implements OnInit {
  public bloods = TYPE_BLOOD;
  public countries = COUNTRIES;
  public states = ESTATES;
  public types = TYPES;
  public validity = VALIDTY;
  public formats = FORMATS;

  constructor() { }

  ngOnInit(): void {
  }

  public getRelatedCountries(event: any) {
    let search = event.target.value;
    this._filterCountries(search.toUpperCase());
  }

  private _filterCountries(search: any) {
    this.countries.filter(async (c) => {
      if (c.country === search) {
        this.countries = await [c];
      }
    });
  }

  public getCountry(countrie: any){
    this.countries = COUNTRIES;
  }

}
