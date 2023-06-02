import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { Iportfolois } from 'src/app/models/iportfolois';
import { PortfoliosService } from 'src/app/services/portfolios.service';

@Component({
  selector: 'app-addportfolios',
  templateUrl: './addportfolios.component.html',
  styleUrls: ['./addportfolios.component.scss'],
})
export class AddportfoliosComponent {
  newportfolois: Iportfolois = {} as Iportfolois;
  constructor(private PS: PortfoliosService, private firestore: Firestore) {}
  ngOnInit() {}

  addData() {
    console.log('ha');

    const collectionInstance = collection(this.firestore, 'protfolios');
    addDoc(collectionInstance, this.newportfolois)
      .then(() => {
        console.log('data seved');
      })
      .catch((err) => {
        console.log('no');
      });
  }
}
