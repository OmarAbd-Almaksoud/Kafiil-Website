import { Injectable } from '@angular/core';
import { Freelancer } from '../models/freelancer';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})

export class CrudService {

freelancer:Freelancer|undefined=undefined;
 
  constructor(private fs:AngularFirestore) {}


  getAllFreelancers():Observable<any[]>{   
return  this.fs.collection("Freelancers").snapshotChanges()
  }



  getFreelancerByID(id:string):any{
    let free;
this.fs.collection("Freelancers").doc(id).ref.get().then(function(doc){
  if (doc.exists) {
    return doc.data();  
      } else {
        console.log("There is no document!");
      }
})
  }


  addFreelancer(freelancer:Freelancer){
   
    this.fs.collection("Freelancers").doc(this.fs.createId()).set(
     freelancer
    )
  }



}
