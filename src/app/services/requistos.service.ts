import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class RequistosService {

  private collectionId = 'u5yVuZhLpH17ejmE7J4u';

  constructor(
    private _db: AngularFirestore
  ) {}

  public getRequisitosLicencias(){
    return this._db.collection(`requisitos/${this.collectionId}/licencias`).get();
  }

  public getRequisitosPermisos(){
    return this._db.collection(`requisitos/${this.collectionId}/permisos`).get();
  }
}
