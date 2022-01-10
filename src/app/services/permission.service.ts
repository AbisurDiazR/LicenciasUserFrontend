import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    private _fb: AngularFirestore
  ) { }

  public addPermission(permissionData: any){
    return this._fb.collection('permisos').add(permissionData);
  }

  public getServiceById(id_permiso: any){
    return this._fb.collection('permisos').doc(id_permiso).get();
  }

  public getPermisosByUser(id_user: any){
    return this._fb.collection('permisos', ref => ref.where('creatorUid', '==', `${id_user}`)).get();
  }

  public searchPermission(invoice: any){
    return this._fb.collection('permisos', ref => ref.where('invoice', '==', `${invoice}`)).get();
  }
}
