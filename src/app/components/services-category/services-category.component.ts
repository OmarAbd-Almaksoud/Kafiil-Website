import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { GetservicesService } from 'src/app/services/getservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-services-category',
  templateUrl: './services-category.component.html',
  styleUrls: ['./services-category.component.scss'],
})
export class ServicesCategoryComponent implements OnInit {
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
  categriesList = [
    {
      categoryName: '',
      CategoryPic: '',
      categoryLink: '',
    },
  ];
  currentCategory = '';
  Featured = false;
  constructor(
    private services: GetservicesService,
    public category: CategoriesService,
    private activatedroute: ActivatedRoute,
    private Router: Router,
    private spinner: NgxSpinnerService
  ) {}
  async ngOnInit(): Promise<void> {
    this.getalldata();
  }
  async getalldata() {
    this.spinner.show();

    this.categriesList = [];
    this.serviceslist = [];
    this.activatedroute.paramMap.subscribe(async (params: any) => {
      this.currentCategory = params.get('categoryID');
      console.log(this.currentCategory);
      await this.category
        .getcategories()
        .then((result) => {
          this.categriesList = Array.from(result);
        })
        .catch((err) => {
          console.log(err);
        });
      await this.services
        .getservicesbyCategory(this.currentCategory)
        .then((results) => {
          results.forEach((element) => {
            element.data.state == 'approved'
              ? (this.serviceslist = [...this.serviceslist, element])
              : null;
          });
          this.spinner.hide();
        })
        .catch((err) => {
          console.log(err);
          this.spinner.hide();
        });
    });
  }
  categoryFilter(categorynav: string) {
    this.serviceslist = [];

    this.spinner.show();
    this.currentCategory == categorynav
      ? this.Router.navigate(['/']).then(() => {
          this.Router.navigate(['/services_category/' + categorynav]);
        })
      : this.Router.navigate(['/services_category/' + categorynav]);
  }
  filterfeatured() {
    this.Featured = !this.Featured;
    console.log(this.Featured);
  }
  async getallservices() {
    this.serviceslist = [];
    this.spinner.show();
    await this.services
      .getservices()
      .then((results) => {
        results.forEach((element) => {
          element.data.state == 'approved'
            ? (this.serviceslist = [...this.serviceslist, element])
            : null;
        });
        this.spinner.hide();
      })
      .catch((err) => {
        console.log(err);
        this.spinner.hide();
      });
  }
}
