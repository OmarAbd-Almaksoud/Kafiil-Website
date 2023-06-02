import { Component, OnInit } from '@angular/core';
import { categoryprojects } from 'src/app/models/categoryProject';
import { Project } from 'src/app/models/projects';
import { ProjectsService } from 'src/app/services/projects.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  LisTOfCat: categoryprojects[] = [];
  NewProj: Project = {
    offers: '4 عروض',
    open: true,
    isFeatured: true,
    isApproved: false,
    accepted: true,
    country: 'مصر',
    personName: JSON.parse(localStorage.getItem('user')!).displayName,
    img: JSON.parse(localStorage.getItem('user')!).photoURL,
  } as Project;

  constructor(
    private proj: ProjectsService,
    private Router: Router,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.proj.getCategoryProject().subscribe((res) => (this.LisTOfCat = res));
  }

  AddNewProjcet() {
    this.proj.AddProject(this.NewProj);
    this.Router.navigate(['/projects']);
  }
}
