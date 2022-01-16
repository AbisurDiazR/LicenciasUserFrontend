import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { MemorandumDialogComponent } from 'src/app/shared/memorandum-dialog/memorandum-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  user: any;

  constructor(
    private _authService: AuthService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    this._authService.getUserById(localStorage.getItem('uid')).subscribe((usr: any) => {
      this.user = { uid: usr.id, ...usr.data() };
      if(this.user.memorandum !== undefined){
        this._dialog.open(MemorandumDialogComponent, {
          width: 'fit-content',
          height: 'fit-content',
          data: {
            memorandum: this.user.memorandum
          }
        });
      }
    }, err => {
      console.log(err);
    });
  }

}
