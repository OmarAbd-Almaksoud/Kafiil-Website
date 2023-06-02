import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { categoryprojects } from 'src/app/models/categoryProject';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.scss'],
})
export class ProjectsDetailsComponent implements OnInit {
  project: any = {};
  ListofCatproj: categoryprojects[] = [];

  constructor(private proj: ProjectsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.proj.getCategoryProject().subscribe((res) => {
      this.ListofCatproj = res;
      console.log(this.ListofCatproj);
    });
    let idproj = this.route.snapshot.paramMap.get('projectID');
    this.proj.getprojecetById(idproj).subscribe((data) => {
      (this.project = data), console.log(data);
    });
  }
}
