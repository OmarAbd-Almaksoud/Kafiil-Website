import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  query,
  where,
  getDocs,
  addDoc,
  docData,
  doc,
} from '@angular/fire/firestore';
import { collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/projects';
import { categoryprojects } from '../models/categoryProject';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  // Proj: Project = {} as Project;
  constructor(private firestore: Firestore) {}

  // getdataofprojects
  getallprojects() {
    const project = collection(this.firestore, 'projects');
    return collectionData(project, { idField: 'id' }) as Observable<Project[]>;
  }

  // **************************/
  //page  Details projcets
  getprojecetById(Projid: any) {
    let getproject = doc(this.firestore, 'projects', Projid);
    return docData(getproject) as Observable<Project>;
  }

  //*********************/
  // //page add project

  AddProject(proj: Project) {
    let project = collection(this.firestore, 'projects');
    addDoc(project, proj)
      .then((res) => {
        console.log('Added Done');
        // return res;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  // ==========================================================================================
  // get all Category
  getCategoryProject() {
    const category = collection(this.firestore, 'categoryprojects');
    return collectionData(category, { idField: 'id' }) as Observable<
      categoryprojects[]
    >;
  }
  // *************************
  // get Category By ID
  async getCategoryByID(catID: string) {
    const q = query(
      collection(this.firestore, 'projects'),
      where('catId', '==', catID)
    );
    const querySnapshot = await getDocs(q);

    var Newproj: Project[] = [];
    querySnapshot.forEach((doc) => {
      // Newproj.push(doc.data() as  Project )
      Newproj = [...Newproj, doc.data() as Project];
      console.log(doc.id, ' => ', doc.data());
    });
    return Newproj;
  }
  // *****************************
  // get Category By Status
  async getCategoryByopenStatus() {
    const q = query(
      collection(this.firestore, 'projects'),
      where('open', '==', true)
    );
    const querySnapshot = await getDocs(q);

    var Newproj: Project[] = [];
    querySnapshot.forEach((doc) => {
      Newproj.push(doc.data() as Project);
      console.log(doc.id, ' => ', doc.data());
    });
    return Newproj;
  }
  // ******************************

  getprojectsByDeliverytime() {
    const DeliveryTime = collection(this.firestore, 'Deliverytimeprojects');
    return collectionData(DeliveryTime, { idField: 'id' }) as Observable<
      categoryprojects[]
    >;
  }

  async GetDeliverytime(delvID: string) {
    const q = query(
      collection(this.firestore, 'projects'),
      where('Deliverytime', '==', delvID)
    );

    const querySnapshot = await getDocs(q);

    var Newproj: Project[] = [];

    querySnapshot.forEach((doc) => {
      // Newproj.push(doc.data() as  Project )

      Newproj = [...Newproj, doc.data() as Project];

      console.log(doc.id, ' => ', doc.data());
    });

    return Newproj;
  }
}
