import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Iportfolois } from 'src/app/models/iportfolois';
import { PortfoliosService } from 'src/app/services/portfolios.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.scss'],
})
export class PortfoliosComponent {
  portfolois: Iportfolois[] = [];
  constructor(
    private PS: PortfoliosService,
    private rout: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();

    this.PS.getallportfolois().subscribe((data) => {
      // console.log("Contests",data);
      this.portfolois = data;
      console.log(data);
      this.spinner.hide();
    });
  }

  goToDetails(id: any) {
    this.rout.navigate(['detailsPortfolois', id]);
  }
}
