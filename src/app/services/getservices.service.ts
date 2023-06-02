import { Injectable } from '@angular/core';
import { Firestore, query, where } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  doc,
  DocumentData,
} from 'firebase/firestore';
import { Service } from './../models/service';

@Injectable({
  providedIn: 'root',
})
export class GetservicesService {
  db = getFirestore();
  constructor(private firestore: Firestore) {}
  serviceslist: any[] = [];
  categoryservices: any[] = [];

  addservice(service: Service) {
    let servicesRef = collection(this.firestore, 'services');
    addDoc(servicesRef, service)
      .then((res) => {
        console.log('data added successfully!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async getservices() {
    const querySnapshot = await getDocs(collection(this.firestore, 'services'));
    this.serviceslist = [];
    querySnapshot.forEach((doc) => {
      this.serviceslist = [
        ...this.serviceslist,
        { uid: doc.id, data: doc.data() },
      ];
    });
    return this.serviceslist;
  }
  async getServicebyID(id: string) {
    const docRef = doc(this.db, 'services', id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }
  async getservicesbyCategory(category: string) {
    this.categoryservices = [];
    const servicesRef = collection(this.db, 'services');

    // Create a query against the collection.
    const q = query(servicesRef, where('category', '==', category));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.categoryservices = [
        ...this.categoryservices,
        { uid: doc.id, data: doc.data() },
      ];
    });
    return this.categoryservices;
  }
}
