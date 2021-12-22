import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FoliosService {

  constructor(
    private _db: AngularFirestore
  ) { }

  public addFolios(data: any){
    return this._db.collection('folios').add(data);
  }
}
