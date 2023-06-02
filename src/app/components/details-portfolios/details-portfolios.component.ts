import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortfoliosService } from 'src/app/services/portfolios.service';

@Component({
  selector: 'app-details-portfolios',
  templateUrl: './details-portfolios.component.html',
  styleUrls: ['./details-portfolios.component.scss'],
})
export class DetailsPortfoliosComponent {
  IdPorfoloi: any = {};
  constructor(private route: ActivatedRoute, private PS: PortfoliosService) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.PS.getportfoloi(id).subscribe((data) => {
      this.IdPorfoloi = data;
      console.log(data);
    });
  }
}
