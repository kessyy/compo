import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from './services';
import { Title } from '@angular/platform-browser';
import { BreadcrumbService, Breadcrumb } from 'angular-crumbs';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    Location, {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ]
})
export class AppComponent implements OnInit {
  isLoading!: Observable<boolean>;
  isHomePage: boolean = true;

  constructor(
    private loaderService: LoaderService,
    private ref: ChangeDetectorRef,
    private titleService: Title,
    private breadcrumbService: BreadcrumbService) {
  }

  ngOnInit() {
    this.isLoading = this.loaderService.isLoading$;
    this.breadcrumbService.breadcrumbChanged.subscribe(crumbs => {
      this.isHomePage = crumbs.length === 0;
      this.titleService.setTitle(this.createTitle(crumbs));
    });
  }

  onActivate(_event: any) {
    window.scroll(0,0);
  }

  private createTitle(routesCollection: Breadcrumb[]) {
    const title = 'Compo - Product Details';
    const titles = routesCollection.filter((route) => route.displayName);
    if (!titles.length) { return title; }
    const routeTitle = this.titlesToString(titles);
    return `${title}${routeTitle}`;
  }

  private titlesToString(titles: any[]) {
    return titles.reduce((prev, curr) => {
      return `${prev} | ${curr.displayName}`;
    }, '');
  }
}
