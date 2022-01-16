import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-memorandum-dialog',
  templateUrl: './memorandum-dialog.component.html',
  styleUrls: ['./memorandum-dialog.component.scss']
})
export class MemorandumDialogComponent implements OnInit {
  memorandum: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<MemorandumDialogComponent>
  ) { }

  ngOnInit(): void {
    this.memorandum = this.data.memorandum
  }

}
