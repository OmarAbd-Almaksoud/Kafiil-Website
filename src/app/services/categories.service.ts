import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { Service } from './../models/service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestore: Firestore) {}
  categriesList: any[] = [];
  addcategory(category: any) {
    let categoryRef = collection(this.firestore, 'categories');
    addDoc(categoryRef, category)
      .then((res) => {
        console.log('category added successfully!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async getcategories() {
    this.categriesList = [];
    const querySnapshot = await getDocs(
      collection(this.firestore, 'categories')
    );
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, ' => ', doc.data());
      // console.log({ uid: doc.id, data: doc.data() });
      // this.categriesList.push(doc.id);
      // this.categriesList.push({ uid: doc.id, data: doc.data() });
      this.categriesList.push(doc.data());
    });
    // console.log(this.categriesList);
    return this.categriesList;
    // console.log(this.categriesList);
  }
}
