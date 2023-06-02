import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  getDoc,
} from '@angular/fire/firestore';

import { collectionData } from '@angular/fire/firestore';
import { Icontest } from './../models/icontest';
import { IcontestSection } from './../models/icontestsection';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContestsService {
  contests: Icontest[] = [];
  contestSections: IcontestSection[] = [];
  constructor(private firestore: Firestore) {}

  getContests() {
    let contest = collection(this.firestore, 'contests');
    return collectionData(contest, { idField: 'id' }) as Observable<Icontest[]>;
  }

  async getContestsBySectionId(sectionId: string) {
    const q = query(
      collection(this.firestore, 'contests'),
      where('sectionId', '==', sectionId)
    );

    const querySnapshot = await getDocs(q);
    var newArr: Array<Icontest> = [];
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data() as Icontest;
      const contest: Icontest = { ...data, id };
      newArr.push(contest);
    });

    return newArr;
  }

  async getContestsByCompletedStatus() {
    const q = query(
      collection(this.firestore, 'contests'),
      where('completed', '==', false)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    var newArr: Array<Icontest> = [];
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data() as Icontest;
      const contest: Icontest = { ...data, id };
      newArr.push(contest);
    });

    return newArr;
  }

  getContestById(contestId: string) {
    const contestRef = doc(this.firestore, 'contests', contestId);

    return getDoc(contestRef).then((doc) => {
      const data = doc.data() as Icontest;
      console.log(data);
      return data;
    });
  }

  getContestSections() {
    let contestSections = collection(this.firestore, 'contestSections');
    return collectionData(contestSections, { idField: 'id' }) as Observable<
      IcontestSection[]
    >;
  }

  addcontest(contests: any) {
    let contestsRef = collection(this.firestore, 'contests');
    addDoc(contestsRef, contests)
      .then((res) => {
        console.log('data added successfully!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addComments(
    contestId: string,
    userName: string,
    userImg: string,
    comment: string
  ) {
    let commentRef = collection(this.firestore, 'contestsComments');
    addDoc(commentRef, {
      contestId: contestId,
      userName: userName,
      userImg: userImg,
      comment: comment,
    })
      .then((res) => {
        console.log('data added successfully!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async getCommentsByContestId(contestId: string) {
    const q = query(
      collection(this.firestore, 'contestsComments'),
      where('contestId', '==', contestId)
    );
    const querySnapshot = await getDocs(q);
    var newArr: Array<any> = [];
    querySnapshot.forEach((doc) => {
      newArr.push(doc.data());
    });

    return newArr;
  }

  async searchContestsByName(name: string) {
    const queryRef = collection(this.firestore, 'contests');
    const q = query(queryRef, where('title', '>=', name));
    const querySnapshot = await getDocs(q);
    var newArr: Array<Icontest> = [];
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data() as Icontest;
      const contest: Icontest = { ...data, id };
      newArr.push(contest);
    });
    return newArr;
  }

  getSectionById(sectionId: string) {
    const contestRef = doc(this.firestore, 'contestSections', sectionId);

    return getDoc(contestRef).then((doc) => {
      const data = doc.data();
      return data;
    });
  }
}
