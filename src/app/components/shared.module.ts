import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'angular-crumbs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { HeaderTwoComponent } from './header-two/header-two.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    HeaderTwoComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    BreadcrumbModule,
    SlickCarouselModule,
  ],
  exports:[
    HeaderTwoComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
