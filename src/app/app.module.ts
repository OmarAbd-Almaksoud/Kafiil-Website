import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FreelancersComponent } from './components/freelancers/freelancers.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AddfreelancerComponent } from './components/addfreelancer/addfreelancer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AddContestComponent } from './components/add-contest/add-contest.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ContestsComponent } from './components/contests/contests.component';
import { ContestDetailsComponent } from './components/contest-details/contest-details.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HeaderComponent } from './components/header/header.component';
import { ServicesComponent } from './components/services/services.component';
import { CardsliderComponent } from './components/cardslider/cardslider.component';
import { ServicecardComponent } from './components/servicecard/servicecard.component';
import { SingleserviceComponent } from './components/singleservice/singleservice.component';
import { AddserviceComponent } from './components/addservice/addservice.component';
import { SingleFreelancerComponent } from './components/single-freelancer/single-freelancer.component';
import { PortfoliosComponent } from './components/portfolios/portfolios.component';
import { AddportfoliosComponent } from './components/addportfolios/addportfolios.component';
import { DetailsPortfoliosComponent } from './components/details-portfolios/details-portfolios.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectsDetailsComponent } from './components/projects-details/projects-details.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesCategoryComponent } from './components/services-category/services-category.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FreelancersComponent,
    NotfoundComponent,
    AddfreelancerComponent,
    AddContestComponent,
    RegisterComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ContestsComponent,
    ContestDetailsComponent,
    HeaderComponent,
    ServicesComponent,
    CardsliderComponent,
    ServicecardComponent,
    SingleserviceComponent,
    AddserviceComponent,
    SingleFreelancerComponent,
    PortfoliosComponent,
    AddportfoliosComponent,
    DetailsPortfoliosComponent,
    ProjectsComponent,
    ProjectsDetailsComponent,
    FooterComponent,
    AddProjectComponent,
    ServicesCategoryComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    AngularFireStorageModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, './assets/i18n/', '.json');
        },
        deps: [HttpClient],
      },
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
