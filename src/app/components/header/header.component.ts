import { Component, DoCheck, OnInit } from '@angular/core';
import { GetservicesService } from 'src/app/services/getservices.service';
import { UserService } from 'src/app/services/user.service';

import { TranslateService } from '@ngx-translate/core';
import { Service } from 'src/app/models/service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, DoCheck {
  user = {
    apiKey: '',
    appName: '',
    createdAt: '',
    displayName: '  ',
    email: '',
    emailVerified: '',
    isAnonymous: '',
    lastLoginAt: '',
    photoURL: '',
    providerData: [{}],
    stsTokenManager: {
      refreshToken: '',
      accessToken: '',
      expirationTime: '',
    },
    uid: '',
  };
  username = '';
  photo = '';

  headserviceslist = [
    {
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
        state: '',
      },
    },
  ];
  headsearchlist = [
    {
      uid: '',
      data: {
        userid: '',
        title: '',

        mainImg: '',
      },
    },
  ];

  constructor(
    private userservice: UserService,
    private translate: TranslateService,
    private services: GetservicesService
  ) {
    translate.setDefaultLang('ar');
  }
  ngDoCheck(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.services.getservices().then((result) => {
      // this.headserviceslist = result;
      result.forEach((element) => {
        element.data.state == 'approved'
          ? (this.headserviceslist = [...this.headserviceslist, element])
          : null;
      });
    });

    // // console.log(this.user.displayName);
    // this.userservice
    //   .getUserbyID(this.user.uid)
    //   .then((user) => {
    //     console.log(user);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
  logout() {
    this.userservice.SignOut();
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    sessionStorage.setItem('lang', lang);
  }
  search(text: string) {
    this.headsearchlist = this.headserviceslist.filter((item) =>
      item.data.title.includes(text)
    );
  }
  navres(data: string) {
    alert(data);
  }
}
