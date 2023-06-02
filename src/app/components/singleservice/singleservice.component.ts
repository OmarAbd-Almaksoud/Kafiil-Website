import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/models/service';
import { GetservicesService } from 'src/app/services/getservices.service';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-singleservice',
  templateUrl: './singleservice.component.html',
  styleUrls: ['./singleservice.component.scss'],
})
export class SingleserviceComponent implements OnInit {
  serviceID: any;
  constructor(
    private activatedroute: ActivatedRoute,
    private getservice: GetservicesService,
    private users: UserService,
    private spinner: NgxSpinnerService
  ) {}

  myservice: Service = {};
  userinfo = {
    uid: '',
    fullname: '',
    email: '',
    imgUrl: '',
  };
  totalprice: number = 0;
  amount: number = 1;
  ngOnInit(): void {
    this.spinner.show();
    this.activatedroute.paramMap.subscribe(async (params: any) => {
      this.serviceID = params.get('serviceID');

      await this.getservice.getServicebyID(this.serviceID).then((service) => {
        this.myservice = service as Service;
        this.totalprice = this.myservice.price!;
      });

      this.users
        .getUserbyID(this.myservice.userid!)
        .then((user) => {
          this.userinfo = user as {
            uid: '';
            fullname: '';
            email: '';
            imgUrl: '';
          };
          this.spinner.hide();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  buyplus() {
    if (this.amount >= 10) {
      this.amount = 10;
    } else {
      this.amount++;
      this.totalprice = this.myservice.price! * this.amount;
    }
  }
  buyminus() {
    if (this.amount <= 1) {
      this.amount = 1;
    } else {
      this.amount--;
      this.totalprice = this.myservice.price! * this.amount;
    }
  }
}
