import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  login() {
   return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  loginFb() {
    return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
   }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
