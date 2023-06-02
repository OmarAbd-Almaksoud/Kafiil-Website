import { Injectable } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDocs } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Iportfolois } from '../models/iportfolois';

@Injectable({
  providedIn: 'root',
})
export class PortfoliosService {
  portfolois: Iportfolois = {} as Iportfolois;
  constructor(private firestore: Firestore) {}

  getallportfolois() {
    let portfoloi = collection(this.firestore, 'protfolios');
    return collectionData(portfoloi, { idField: 'id' }) as Observable<
      Iportfolois[]
    >;
  }

  getportfoloi(id: any) {
    let portfoloi = doc(this.firestore, 'protfolios', id);
    return docData(portfoloi) as Observable<Iportfolois[]>;
  }

  // async getportfolois() {
  //   const querySnapshot = await getDocs(collection(this.firestore, 'protfolios'));
  //   querySnapshot.forEach((doc) => {
  //     // console.log(doc.id, ' => ', doc.data());
  //     // console.log({ uid: doc.id, data: doc.data() });
  //     return doc.id, ' => ', doc.data();
  //   });
  // }

  addData() {
    console.log('ha');

    const collectionInstance = collection(this.firestore, 'protfolios');
    addDoc(collectionInstance, this.portfolois)
      .then(() => {
        console.log('data seved');
      })
      .catch((err) => {
        console.log('no');
      });
  }
}
