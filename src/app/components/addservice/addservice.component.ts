import {
  Component,
  ViewChild,
  ViewChildren,
  ElementRef,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { GetservicesService } from 'src/app/services/getservices.service';
import { Service } from '../../models/service';
import { Addon } from '../../models/service';
// import { AddserviceformService } from 'src/app/services/addserviceform.service';
import { Injectable } from '@angular/core';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrls: ['./addservice.component.scss'],
})
export class AddserviceComponent implements OnInit, AfterViewInit {
  constructor(
    public formbuilder: FormBuilder,
    public service: GetservicesService,
    // public addserviceform: AddserviceformService,
    private firestorage: FirestorageService,
    private Category: CategoriesService,
    private elRef: ElementRef
  ) {}
  categorylist = [
    {
      CategoryPic: 'assets/images/audio.svg',
      categoryLink: '#',
      categoryName: 'صوتيات',
    },
  ];
  serviceform = this.formbuilder.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(100)]],
    category: ['', Validators.required],
    price: ['', [Validators.required, Validators.min(5), Validators.max(999)]],
    mainImg: [''],
    imgs: this.formbuilder.array(['']),
    deliveryDuration: ['', Validators.required],
    buyerinstructions: ['', [Validators.required, Validators.minLength(20)]],
    addons: this.formbuilder.array([]),
  });

  serviceDraft = JSON.parse(sessionStorage.getItem('serviceDraft')!);
  myservice!: Service;
  serviceaddons!: Addon;
  newserviceaddons!: Addon[];
  newaddons = this.serviceform.controls['addons'].value!;
  mainImg!: string;
  otherImgs: string[] = [];
  file!: File;
  imgslist: File[] = [];
  @ViewChild('myModal', { static: true }) myModal!: ElementRef;

  @ViewChild('loadingmodalbtn', { static: true })
  modalbtn!: ElementRef<HTMLElement>;

  ngOnInit() {
    this.categorylist = [];
    this.Category.getcategories()
      .then((res) => {
        this.categorylist = Array.from(res);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('dismiss');
  }
  ngAfterViewInit() {}
  onfilechange(input: any) {
    const file = input.target.files[0];
  }
  clearpreview() {
    this.mainImg = '';
    return false;
  }
  clearpreviewitem(index: number) {
    this.otherImgs.splice(index, 1);
    return false;
  }

  chosemainimg() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = async (_) => {
      // you can use this method to get file and perform respective operations
      this.file = input.files![0];

      let path = URL.createObjectURL(this.file);
      this.mainImg = path;
      const reader = new FileReader();
      reader.onload = () => {
        this.mainImg = reader.result as string;
      };
      reader.readAsDataURL(this.file);
    };
    input.click();
    return false;
  }
  choseimgs() {
    let input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = async (_) => {
      // you can use this method to get file and perform respective operations
      let files = Array.from(input.files!);
      console.log(files);
      if (files.length > 4) {
        alert('اقصي عدد للصور هو 4 فقط');
      } else if (this.otherImgs.length + files.length > 4) {
        alert(`يمكن تحديد عدد ${4 - this.otherImgs.length}صورة فقط!`);
      } else {
        for (let item of files) {
          let path = URL.createObjectURL(item);
          const reader = new FileReader();
          reader.onload = () => {
            this.otherImgs.push(reader.result as string);
          };
          reader.readAsDataURL(item);
          this.imgslist.push(item);
        }
        console.log(this.imgslist);
      }
      //  = await this.firestorage.uploadfile(this.file);
    };
    input.click();
    return false;
  }

  async addservice() {
    let modalbtn = this.modalbtn.nativeElement;
    modalbtn.click();

    await this.fillmyservice();
    if (this.serviceform.valid) {
      this.service.addservice(this.myservice);
      console.log('data added successfully');
      modalbtn.click();
      alert('تم اضافة الخدمة !');

      this.serviceform.reset();
    } else {
      console.log('form is invalid');
      alert(
        'فشلت المهمة , من فضلك تاكد من ملئ البيانات بشكل صحيح وحاول مرة اخري!'
      );

      modalbtn.click();
    }
  }

  get addons() {
    return this.serviceform.get('addons') as FormArray;
  }

  newaddon() {
    ('new addon');
    const addongroup = this.formbuilder.group({
      addonTitle: ['', [Validators.required, Validators.minLength(5)]],
      addonPrice: [
        '',
        [Validators.required, Validators.min(0), Validators.max(999)],
      ],
      addonDeliveryDuration: ['', Validators.required],
    });
    this.addons.push(addongroup);
    return false;
  }

  deleteaddon(index: number) {
    ('deleted');
    this.addons.removeAt(index);
    return false;
  }

  ////////////////////////// save draft
  saveDraft() {
    let data = JSON.stringify(this.serviceform.value);
    sessionStorage.setItem('serviceDraft', data);
    this.serviceDraft = sessionStorage.getItem('serviceDraft');
  }

  ////////////////////////// restore draft
  restoreDraft() {
    const draftAddons = this.serviceDraft['addons'];
    for (let item of draftAddons) {
      const addongroup = this.formbuilder.group({
        addonTitle: ['', [Validators.required, Validators.minLength(5)]],
        addonPrice: [
          '',
          [Validators.required, Validators.min(0), Validators.max(999)],
        ],
        addonDeliveryDuration: ['', Validators.required],
      });
      item;
      this.addons.push(addongroup);
    }
    this.serviceform.setValue({
      title: this.serviceDraft['title'],
      description: this.serviceDraft['description'],
      price: this.serviceDraft['price'],
      mainImg: this.serviceDraft['mainImg'],
      category: this.serviceDraft['category'],
      imgs: this.serviceDraft['imgs'],
      deliveryDuration: this.serviceDraft['deliveryDuration'],
      buyerinstructions: this.serviceDraft['buyerinstructions'],
      addons: Array.from(draftAddons),
    });
  }

  ////////////////////////// fill data in the model object
  async fillmyservice() {
    let imgurl = await this.firestorage.uploadfile(this.file);
    console.log(`main image uploaded!`);
    let imgs = [];
    let i = this.imgslist.length;
    for (let img of this.imgslist) {
      let url = await this.firestorage.uploadfile(img);
      console.log(`uploaded image  ${this.imgslist.indexOf(img) + 1}`);
      imgs.push(url);
    }

    let user;
    user = JSON.parse(localStorage.getItem('user')!);

    this.myservice = {
      userid: user.uid,
      title: this.serviceform.controls['title'].value!,
      description: this.serviceform.controls['description'].value!,
      category: this.serviceform.controls['category'].value!,
      price: parseInt(this.serviceform.controls['price'].value!),
      mainImg: imgurl,
      imgs: Array.from(imgs),
      deliveryDuration: this.serviceform.controls['deliveryDuration'].value!,
      buyerinstructions: this.serviceform.controls['buyerinstructions'].value!,
      addons: [],
      isaproved: false,
      isfeatured: false,
      state: 'pending',
      rating: 0,
    };
    this.newaddons = this.serviceform.controls['addons'].value!;
    for (let [i, item] of this.newaddons.entries()) {
      this.serviceaddons = {
        addonTitle: this.serviceform.get(`addons.${i}.addonTitle`)?.value!,
        addonDeliveryDuration: this.serviceform.get(
          `addons.${i}.addonDeliveryDuration`
        )?.value!,
        addonPrice: this.serviceform.get(`addons.${i}.addonPrice`)?.value!,
      };
      // console.log(this.serviceaddons);

      // this.newserviceaddons = [...this.newserviceaddons, this.serviceaddons];
      this.myservice.addons?.push(this.serviceaddons);
    }
    console.log(this.myservice);
  }
}
