import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../components/shared.module';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SlickCarouselModule } from 'ngx-slick-carousel';


import {
  ProducDetailsComponent,
} from './index';


@NgModule({
  declarations: [
    ProducDetailsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    PagesRoutingModule,
    SharedModule,
    SlickCarouselModule,
  ],
  exports: [
  ],
})
export class PagesModule { }
