import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-save-confirmation',
  templateUrl: './save-confirmation.component.html',
  styleUrls: ['./save-confirmation.component.scss']
})
export class SaveConfirmationComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<SaveConfirmationComponent>
  ) { }

  ngOnInit(): void {
  }

}
