import { Component, OnInit } from '@angular/core';
import { Icontest } from 'src/app/models/icontest';
import { IcontestSection } from 'src/app/models/icontestsection';
import { ContestsService } from 'src/app/services/contests.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.scss'],
})
export class ContestsComponent {
  contest: Icontest[] = [];
  contestArr: Icontest[] = [];

  contestWithComment: any[] = [];
  contestSections: IcontestSection[] = [];
  contestComments: any[] = [];

  constructor(
    private CS: ContestsService,
    private router: Router,
    private US: UserService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.contestWithComment = [];
    this.GetAllContests();
    console.log(this.contest);
    this.GetAllContestSections();
  }

  GetAllContests() {
    this.contestWithComment = [];
    this.CS.getContests().subscribe(async (data) => {
      for (var i = 0; i < data.length; i++) {
        let sectionName: string = '';
        await this.CS.getSectionById(data[i].sectionId).then((res) => {
          sectionName = res?.['name'];
        });

        this.contestWithComment.push({ ...data[i], sectionName: sectionName });

        this.contest = this.contestWithComment;
        this.contestArr = this.contestWithComment;
      }
      this.spinner.hide();
    });
  }

  GetAllContestSections() {
    this.CS.getContestSections().subscribe((data) => {
      this.contestSections = data;
    });
  }

  ChangeContestSectionId(id: string) {
    this.contestWithComment = [];
    this.CS.getContestsBySectionId(id).then(async (data) => {
      console.log(data);

      for (var i = 0; i < data.length; i++) {
        let sectionName: string = '';
        await this.CS.getSectionById(data[i].sectionId).then((res) => {
          sectionName = res?.['name'];
        });

        this.contestWithComment.push({ ...data[i], sectionName: sectionName });

        // this.contest = this.contestWithComment;

        this.contestArr = this.contestWithComment;
      }
    });
  }

  ChangeContestCompletedStatus() {
    this.contestWithComment = [];
    this.CS.getContestsByCompletedStatus().then(async (data) => {
      console.log(data);

      for (var i = 0; i < data.length; i++) {
        let sectionName: string = '';
        await this.CS.getSectionById(data[i].sectionId).then((res) => {
          sectionName = res?.['name'];
        });

        this.contestWithComment.push({ ...data[i], sectionName: sectionName });

        // this.contest = this.contestWithComment;
        this.contestArr = this.contestWithComment;
      }
    });
  }

  openContestDetails(contestID: string) {
    this.router.navigate(['contests', contestID]);
  }

  getCommentsByContestId(currentContestID: string) {
    return this.CS.getCommentsByContestId(currentContestID).then((res) => {
      return res.length;
    });
  }

  searchByName(name: string) {
    this.contestWithComment = [];
    this.CS.searchContestsByName(name).then(async (data) => {
      this.contest = data;
      for (var i = 0; i < data.length; i++) {
        let sectionName: string = '';
        await this.CS.getSectionById(data[i].sectionId).then((res) => {
          sectionName = res?.['name'];
        });

        this.contestWithComment.push({ ...data[i], sectionName: sectionName });

        // this.contest = this.contestWithComment;

        this.contestArr = this.contestWithComment;
      }
    });
  }
}
