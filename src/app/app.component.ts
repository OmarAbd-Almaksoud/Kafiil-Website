import { Component} from '@angular/core';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  title = 'كفيل';

  textDir: string = 'rtl';

  constructor(private translate: TranslateService) {

    this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
    {
      console.log(event.lang);
      if(event.lang == 'ar'){
        this.textDir = 'rtl';
      }else{
        this.textDir = 'ltr';
      }
      console.log(this.textDir);  
    });
    
  }




}
