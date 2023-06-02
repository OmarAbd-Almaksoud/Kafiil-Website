import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FreelancersComponent } from './components/freelancers/freelancers.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ContestsComponent } from './components/contests/contests.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ContestDetailsComponent } from './components/contest-details/contest-details.component';
import { AddContestComponent } from './components/add-contest/add-contest.component';
import { ServicesComponent } from './components/services/services.component';
import { AuthGuard } from './guards/auth.guard';
import { SingleserviceComponent } from './components/singleservice/singleservice.component';
import { AddserviceComponent } from './components/addservice/addservice.component';
import { SingleFreelancerComponent } from './components/single-freelancer/single-freelancer.component';
import { AddfreelancerComponent } from './components/addfreelancer/addfreelancer.component';
import { PortfoliosComponent } from './components/portfolios/portfolios.component';
import { AddportfoliosComponent } from './components/addportfolios/addportfolios.component';
import { DetailsPortfoliosComponent } from './components/details-portfolios/details-portfolios.component';
import { ProjectsDetailsComponent } from './components/projects-details/projects-details.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ServicesCategoryComponent } from './components/services-category/services-category.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-in', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgetPasswordComponent },
  { path: 'freelancers', component: FreelancersComponent },
  { path: 'freelancers/:fid', component: SingleFreelancerComponent },
  {
    path: 'addFreelancer',
    component: AddfreelancerComponent,
    canActivate: [AuthGuard],
  },
  { path: 'contests', component: ContestsComponent },
  { path: 'contests/:contestID', component: ContestDetailsComponent },
  {
    path: 'addContest',
    component: AddContestComponent,
    canActivate: [AuthGuard],
  },
  // { path: 'ServicesCategory', component: ServicesCategoryComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'services/:serviceID', component: SingleserviceComponent },
  {
    path: 'services_category/:categoryID',
    component: ServicesCategoryComponent,
  },
  {
    path: 'createservice',
    component: AddserviceComponent,
    canActivate: [AuthGuard],
  },
  { path: 'portfolios', component: PortfoliosComponent },
  {
    path: 'newportfolio',
    component: AddportfoliosComponent,
    canActivate: [AuthGuard],
  },
  { path: 'detailsPortfolois/:id', component: DetailsPortfoliosComponent },
  {
    path: 'addproject',
    component: AddProjectComponent,
    canActivate: [AuthGuard],
  },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/:projectID', component: ProjectsDetailsComponent },
  { path: 'home', component: HomeComponent },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
