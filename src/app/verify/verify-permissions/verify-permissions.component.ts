import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-verify-permissions',
  templateUrl: './verify-permissions.component.html',
  styleUrls: ['./verify-permissions.component.scss']
})
export class VerifyPermissionsComponent implements OnInit {
  public invoiceForm!: any;
  public permisos: any = [];
  public displayedColumns = ['invoice','brand','line','model','color','numMotor','numSerial','expeditionDate','expirationDate'];
  public dataSource = new MatTableDataSource();
  invoiceExist!: boolean;
  queryParam: any;
  search!: boolean;


  constructor(
    private _permissionService: PermissionService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { 
    this.invoiceForm = this._fb.group({
      invoice: new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void {
  }

  public permissionSearch(){
    let invoice = this.invoiceForm.controls['invoice'].value;
    this._permissionService.searchPermission(invoice).pipe().subscribe((querySnapshot: any) => {
      let arrayResults: any = [];
      querySnapshot.forEach((element: any) => {
        arrayResults.push(element.data());
      });
      if (arrayResults.length > 0) {
        this.invoiceExist = true;
        this.search = false;
        console.log(arrayResults[0]);
        this.permisos.push(arrayResults[0]);
        this.dataSource.data = this.permisos;
      } else {
        this.search = true;
        this.invoiceExist = false;
        this.queryParam = this.invoiceForm.controls['invoice'].value;
        this.invoiceForm.controls['invoice'].setValue('');        
        this._snackBar.open('Permiso no registrado','',{
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000
        });      
      }
    });
  }

}
