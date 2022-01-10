import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensesPicturesComponent } from './licenses-pictures.component';

describe('LicensesPicturesComponent', () => {
  let component: LicensesPicturesComponent;
  let fixture: ComponentFixture<LicensesPicturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicensesPicturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensesPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
