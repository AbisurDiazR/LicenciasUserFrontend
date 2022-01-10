import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class LogosService {

  constructor(
    private storage: AngularFireStorage,
    public fireStore: AngularFirestore
  ) { }

  public uploadPhoto(pathName: string, fileData: any){
    return this.storage.upload(pathName,fileData);
  }

  public getRefStorage(pathName: string){
    return this.storage.ref(pathName);
  };

  public getUidDocument(){
    return this.fireStore.collection('logos').ref.get();
  }

  public updateDocument(id: any, data: any){
    return this.fireStore.collection('logos').doc(id).update(data);
  }
}
