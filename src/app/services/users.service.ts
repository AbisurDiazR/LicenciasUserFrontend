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
}
