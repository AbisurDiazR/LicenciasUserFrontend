import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {;

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
}
