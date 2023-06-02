import { Injectable, NgZone } from '@angular/core';
import { User } from './../models/iuser';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  collection,
  Firestore,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  getDoc,
  getFirestore,
} from '@angular/fire/firestore';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private firestore: Firestore
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);

        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  SignUp(
    email: string,
    password: string,
    fname: string,
    sname: string,
    rePassword: string
  ) {
    if (password == rePassword) {
      return this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then(async (result) => {
          const user = result.user;
          await user
            ?.updateProfile({
              displayName: `${fname} ${sname}`,
              photoURL:
                'https://firebasestorage.googleapis.com/v0/b/kafiil-12b6c.appspot.com/o/images%2Fuserimage.png?alt=media&token=e88880bd-c2f9-4562-9a72-5628441ad27a',
            })
            .then(() => {
              this.SetUserData(result.user);
              this.router.navigate(['sign-in']);
            });
        })
        .catch((error) => {
          window.alert(error.message);
        });
    } else {
      window.alert('Passwords do not match');
      return;
    }
  }

  // forget password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['']);
    });
  }

  // Sign in with Twitter
  TwitterAuth() {
    return this.AuthLogin(new auth.TwitterAuthProvider()).then((res: any) => {
      this.router.navigate(['']);
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  //  Setting up user data when sign in with username/password,
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    console.log(JSON.stringify(user));

    const userData: User = {
      uid: user.uid,
      fullname: user.displayName,
      imgUrl: user.photoURL,
      email: user.email,
      isAdmin: false,
      // password : user.password,
      // rePassword : user.repassword
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }

  // get user data by id
  getUserById(userId: string) {
    const userRef = doc(this.firestore, 'users', userId);
    return getDoc(userRef).then((doc) => {
      const data = doc.data() as User;
      console.log(data);
      return data.fullname;
    });
  }
  ///////////mostafa
  async getUserbyID(id: string) {
    const docRef = doc(getFirestore(), 'users', id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }
}
