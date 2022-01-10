import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(
    private _db: AngularFirestore,
    private _auth: AngularFireAuth
  ) {}

  public getCurrentUser(){
    return this._auth.authState;
  }

  public async login(email: any, password: any) {
    try {
      const login = await this._auth.signInWithEmailAndPassword(email, password);
      return login;
    } catch (e: any) {
      let errorType = e.message;
      return errorType;
    }
  }

  public getUserById(userId: any) {
    return this._db.collection('usuarios').doc(userId).get();
  }

  public loggedIn(){
    return !!localStorage.getItem('uid');
  }

  public async logout() {
    try {
      await this._auth.signOut();
      localStorage.removeItem('uid');
    } catch (err) {
    }

  }

  public saveUserData(userData: any, usr: any, uid: any){
    let data = {
      correo: userData.correo,
      password: userData.password,
      nombre: userData.correo,
      activo: 'Activo',
      funciones: userData.funciones,
      rol: userData.rol,
      foliosLicencia: userData.foliosLicencia,
      folioPermisoInicial: userData.folioPermisoInicial,
      folioPermisoFinal: userData.folioPermisoFinal,
      createdAt: usr.createdAt,
      creationTime: usr.creationTime,
      lastLoginAt: usr.lastLoginAt,
      lastSignInTime: usr.lastSignInTime
    };
    return this._db.collection(`usuarios`).doc(uid).set(data);
  }

  public updateUserData(userData: any, id_cuenta: any){
    let data = {
      correo: userData.correo,
      password: userData.password,
      nombre: userData.correo,
      activo: 'Activo',
      funciones: userData.funciones,
      rol: userData.rol,
      foliosLicencia: userData.foliosLicencia,
      folioPermisoInicial: userData.folioPermisoInicial,
      folioPermisoFinal: userData.folioPermisoFinal
    }
    return this._db.collection('usuarios').doc(id_cuenta).set(data);
  }

  public createAccount(email: any, password: any){
    return this._auth.createUserWithEmailAndPassword(email, password);
  }

  public deleteUser(uid: any){
  }
}
