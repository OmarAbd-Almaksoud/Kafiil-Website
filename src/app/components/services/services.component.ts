import {
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { GetservicesService } from 'src/app/services/getservices.service';
import { Service } from '../../models/service';
import { filter } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit, DoCheck {
  hidden = true;
  showcount = 3;
  searchtext = '';
  itemscount = 5;
  showcountLG = 6;
  showcountSM = 4;
  searchtxt = '';

  constructor(
    public service: GetservicesService,
    public category: CategoriesService,
    private spinner: NgxSpinnerService
  ) {}
  ngDoCheck(): void {}
  // @ViewChild('preloadermodalbtn', { static: true })
  // preloadermodalbtn!: ElementRef<HTMLElement>;
  // @ViewChild('preloaderdismissmodalbtn', { static: true })
  // preloaderdismissmodalbtn!: ElementRef<HTMLElement>;

  // @ViewChildren('categorybtn') categorybtn: QueryList<ElementRef> | undefined;
  searchlist = [
    {
      uid: '',
      data: {
        userid: '',
        title: '',

        mainImg: '',
      },
    },
  ];
  categriesList = [
    {
      categoryName: 'تسويق',
      CategoryPic: 'assets/images/marketing.svg',
      categoryLink: '#',
    },
  ];

  serviceslist = [
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
  sliders = [
    {
      name: 'خدمات التسويق',
      link: '#',
      items: [
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
          },
        },
      ],
      category: 'تسويق',
    },
    {
      name: 'خدمات التصميم',
      link: '#',
      items: [
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
          },
        },
      ],
      category: 'تصاميم فنيه',
    },
    {
      name: 'خدمات مالية',
      link: '#',
      items: [
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
          },
        },
      ],
      category: 'خدمات مالية',
    },
    {
      name: 'خدمات برمجية',
      link: '#',
      items: [
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
          },
        },
      ],
      category: 'برمجيات',
    },
    {
      name: 'خدمات صوتية',
      link: '#',
      items: [
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
          },
        },
      ],
      category: 'صوتيات',
    },
    {
      name: 'خدمات الكتابة و الترجمة',
      link: '#',
      items: [
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
          },
        },
      ],
      category: 'كتابة وترجمة',
    },
  ];
  async ngOnInit() {
    this.spinner.show();

    // let preloader = this.preloadermodalbtn.nativeElement;
    // preloader.click();

    // let dismiss = this.preloaderdismissmodalbtn.nativeElement;

    if (window.innerWidth < 770) {
      this.showcount = this.showcountSM;
    } else {
      this.showcount = this.showcountLG;
    }

    await this.category
      .getcategories()
      .then((result) => {
        this.categriesList = Array.from(result);
      })
      .catch((err) => {
        console.log(err);
      });
    await this.service.getservices().then((results) => {
      this.serviceslist = [];
      results.forEach((element) => {
        element.data.state == 'approved'
          ? (this.serviceslist = [...this.serviceslist, element])
          : null;
      });

      this.spinner.hide();
      // setTimeout(() => {
      // }, 500);
    });

    for (let service of this.serviceslist) {
      for (let slider of this.sliders) {
        if (service.data.category === slider.category) {
          slider.items.push(service);
        }
      }
    }

    // console.log(this.sliders);

    // for (let slider of this.sliders) {
    //   let itemslist = [];
    //   for (let service of this.serviceslist) {
    //     // console.log(service);
    //     if (slider.category === service.data.category) {
    //       itemslist.push(service);
    //     }
    //   }
    // }
  }

  ngOnChanges() {
    if (window.innerWidth < 770) {
      this.showcount = this.showcountSM;
    } else {
      this.showcount = this.showcountLG;
    }
  }
  showallcat() {
    if (window.innerWidth < 770) {
      this.showcount = this.showcountSM;
      if (this.hidden) {
        this.showcount = this.categriesList.length;

        this.hidden = false;
      } else {
        this.showcount = this.showcountSM;

        this.hidden = true;
      }
    } else {
      this.showcount = this.categriesList.length;

      if (this.hidden) {
        this.showcount = this.categriesList.length;

        this.hidden = false;
      } else {
        this.showcount = this.showcountLG;

        this.hidden = true;
      }
    }

    return false;
  }

  search(text: string) {
    this.searchlist = this.serviceslist.filter((item) =>
      item.data.title.includes(text)
    );
  }

  test() {
    // this.service.getservices().then((results) => {
    //   // console.log(results);
    //   this.serviceslist = results;
    // });
    console.log(
      this.serviceslist.filter((item) => item.data.state == 'pending')
    );
  }
  // );
}
// }
