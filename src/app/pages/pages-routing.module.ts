import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ProducDetailsComponent,
} from './index';

const routes: Routes = [
  { path: '', component: ProducDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}


