import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Freelancer } from 'src/app/models/freelancer';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addfreelancer',
  templateUrl: './addfreelancer.component.html',
  styleUrls: ['./addfreelancer.component.scss'],
})
export class AddfreelancerComponent {
  newFreelancer: Freelancer = {
    views: 0,
    likes: 0,
    rating: 0,
    portfolio: 0,
  } as unknown as Freelancer;
  path: string = '';
  constructor(
    private service: CrudService,
    private fs: AngularFirestore,
    private router: Router
  ) {}
  ngOnInit(): void {}

  addNewFreelancer() {
    let id = this.fs.createId();
    this.fs.collection('Freelancers').doc(id).set(this.newFreelancer);
    this.router.navigate(['/freelancers']);
  }
}
