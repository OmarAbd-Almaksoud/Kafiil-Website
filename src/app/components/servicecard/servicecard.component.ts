import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-servicecard',
  templateUrl: './servicecard.component.html',
  styleUrls: ['./servicecard.component.scss'],
})
export class ServicecardComponent implements OnChanges {
  constructor(private users: UserService) {}
  @Input() carddata = {
    uid: '',
    data: {
      userid: '',
      title: '',
      description: '',
      category: '',
      price: '',
      mainImg: '',
      imgs: [],
      deliveryDuration: '',
      buyerinstructions: '',
      addons: [
        {
          addonTitle: '',
          addonPrice: 0,
          addonDeliveryDuration: '',
        },
      ],
      isfeatured: '',
      isaproved: '',
      rating: 0,
      orderscount: 0,
    },
  };
  userinfo = {
    uid: '',
    fullname: '',
    email: '',
    imgUrl: '',
  };
  data: any;
  ngOnChanges(changes: SimpleChanges) {}
  ngOnInit() {
    this.users.getUserbyID(this.carddata.data.userid).then((user) => {
      this.userinfo = user as {
        uid: '';
        fullname: '';
        email: '';
        imgUrl: '';
      };
      // console.log(this.userinfo);
    });

    // console.log();
    // this.users.getuserbyid(this.carddata.data.userid).subscribe((user) => {
    //   this.data = user.data();
    //   console.log(this.data);
    //   console.log(user.data());
    // });
  }
}
