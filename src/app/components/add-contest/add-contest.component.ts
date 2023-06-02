import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContestsService } from 'src/app/services/contests.service';
import { IcontestSection } from 'src/app/models/icontestsection';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-contest',
  templateUrl: './add-contest.component.html',
  styleUrls: ['./add-contest.component.scss'],
})
export class AddContestComponent {
  contestSections: IcontestSection[] = [];

  userId: string = '';

  constructor(
    private formbuilder: FormBuilder,
    private CS: ContestsService,
    private router: Router,
    private location: Location
  ) {}
  contestform = this.formbuilder.group({
    userId: JSON.parse(localStorage.getItem('user')!).uid,
    userName: JSON.parse(localStorage.getItem('user')!).displayName,
    userImg: JSON.parse(localStorage.getItem('user')!).photoURL,
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(50)]],
    conditions: [''],
    sectionId: ['', [Validators.required]],
    deliveryDuration: ['', [Validators.required]],
    contestDuration: ['', [Validators.required]],
    winnersNum: ['', [Validators.required]],
    firstWinner: ['', [Validators.required]],
    skills: [''],
    completed: [false],
    accepted: [true],
    comment: Math.floor(Math.random() * (300 - 1 + 1)) + 1,
    Posts: Math.floor(Math.random() * (3000 - 1 + 1)) + 1,
    Views: Math.floor(Math.random() * (3000 - 1 + 1)) + 1,
    contestants: Math.floor(Math.random() * (200 - 1 + 1)) + 1,
  });

  contestDraft = JSON.parse(localStorage.getItem('contestDraft')!);

  ngOnInit() {
    this.contestDraft = this.contestDraft;

    this.CS.getContestSections().subscribe((data) => {
      this.contestSections = data;
    });
  }

  addContest() {
    if (this.contestform.valid) {
      this.CS.addcontest(this.contestform.value);
      this.contestform.setValue({
        userId: '',
        userName: '',
        userImg: '',
        description: '',
        title: '',
        conditions: '',
        sectionId: '',
        deliveryDuration: '',
        contestDuration: '',
        firstWinner: '',
        winnersNum: '',
        skills: '',
        completed: false,
        accepted: true,
        comment: 0,
        Posts: 0,
        Views: 0,
        contestants: 0,
      });
      alert('تم اضافة المسابقة !');
    } else{     
      alert( 'فشلت المحاولة , من فضلك تاكد من ملئ البيانات بشكل صحيح وحاول مرة اخري!');
    }
  }

  

  saveDraft() {
    let data = JSON.stringify(this.contestform.value);
    localStorage.setItem('contestDraft', data);
    this.contestDraft = localStorage.getItem('contestDraft');
  }

  restoreDraft() {
    this.contestform.setValue({
      userId: this.contestDraft['userId'],
      userName: this.contestDraft['userName'],
      userImg: this.contestDraft['userImg'],
      description: this.contestDraft['description'],
      title: this.contestDraft['title'],
      conditions: this.contestDraft['conditions'],
      sectionId: this.contestDraft['sectionId'],
      deliveryDuration: this.contestDraft['deliveryDuration'],
      contestDuration: this.contestDraft['contestDuration'],
      firstWinner: this.contestDraft['firstWinner'],
      winnersNum: this.contestDraft['winnersNum'],
      skills: this.contestDraft['skills'],
      completed: this.contestDraft['completed'],
      accepted: this.contestDraft['accepted'],
      comment:
        this.contestDraft['comment'] |
        (Math.floor(Math.random() * (300 - 1 + 1)) + 1),
      Posts:
        this.contestDraft['posts'] |
        (Math.floor(Math.random() * (3000 - 1 + 1)) + 1),
      Views:
        this.contestDraft['views'] |
        (Math.floor(Math.random() * (3000 - 1 + 1)) + 1),
      contestants:
        this.contestDraft['contestants'] |
        (Math.floor(Math.random() * (200 - 1 + 1)) + 1),
    });
  }
}
