import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class LicenciasService {
    
  constructor(
    private _storage: AngularFireStorage,
    private _fb: AngularFirestore
  ) { }

  public async uploadPhoto(pathName: string, fileData: any){
    return (await this._storage.upload(pathName,fileData)).ref;
  }

  public saveLicencia(data: any){
    return this._fb.collection('licencias').add(data);
  }

  public getLicencias(){
    return this._fb.collection('licencias');
  }

  public getLicenciaById(id_licencia: any) {
    return this._fb.collection('licencias').doc(id_licencia).get();
  }

  public getLicenciasByUser(uid: any) {
    return this._fb.collection('licencias', ref => ref.where('creator', '==', `${uid}`)).get();
  }
}
