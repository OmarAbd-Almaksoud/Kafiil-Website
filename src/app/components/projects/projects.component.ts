import { Component } from '@angular/core';
import { categoryprojects } from 'src/app/models/categoryProject';
import { Project } from 'src/app/models/projects';
import { ProjectsService } from 'src/app/services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  ListOfProject: Project[] = [];
  ListofCatproj: categoryprojects[] = [];
  ListofDeliverytimeprojects: categoryprojects[] = [];
  spinner: boolean = true;
  searchTerm = '';

  constructor(private proj: ProjectsService, private router: Router) {}
  ngOnInit(): void {
    this.proj.getallprojects().subscribe((res) => {
      this.spinner = false;
      this.ListOfProject = res;
    });
    this.proj.getCategoryProject().subscribe((res) => {
      this.ListofCatproj = res;
    });
    this.proj
      .getprojectsByDeliverytime()
      .subscribe((res) => (this.ListofDeliverytimeprojects = res));
  }
  getprojects() {
    this.proj.getallprojects().subscribe((res) => {
      this.spinner = false;
      this.ListOfProject = res;
    });
  }
  // getcategory By ID
  ChangeCatID(id: string) {
    console.log(id);
    this.proj.getCategoryByID(id).then((res) => {
      this.ListOfProject = res;
    });
  }
  // getcategory By status
  ChangeCatByStatus() {
    this.proj.getCategoryByopenStatus().then((res) => {
      this.ListOfProject = res;
    });
  }

  // get project By ID
  Detailsproject(projectID: any) {
    // console.log(projectID);
    this.router.navigate(['projects', projectID]);
  }

  ///// Handling Search ///
  Search(val: string) {}
  //getDelivary Project

  ChangeDelivary(id: string) {
    console.log(id);

    this.proj.GetDeliverytime(id).then((res) => {
      this.ListOfProject = res;
    });
  }
}
