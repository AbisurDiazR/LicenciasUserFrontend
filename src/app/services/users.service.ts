import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(
    private _db: AngularFirestore
  ) { }

  public getAllUsers(){
    return this._db.collection('usuarios').get();
  }

  public updateStateUser(id_cuenta: any, state: any){
    return this._db.collection('usuarios').doc(id_cuenta).update({activo: state});
  }

  public addMemorandum(id_cuenta: any, arg1: string) {
    return this._db.collection('usuarios').doc(id_cuenta).update({memorandum: arg1});
  }
}
