import { Component, OnDestroy, OnInit, } from '@angular/core';
import { ContentService } from '../../../core/services/content';


@Component({
    selector: 'dashboard-page',
    templateUrl: 'dashboard-page.template.html'
})

export class DashboardPageComponent implements OnDestroy, OnInit {

    public nav: any;
    public content: any;
    public clickval = 0;

    public constructor(private contentService: ContentService) {
        this.nav = document.querySelector('nav.navbar');
        this.content = contentService.retrieveContent('asd');
    }

    public ngOnInit(): any {
        this.nav.className += ' white-bg';
    }

    public ngOnDestroy(): any {
        this.nav.classList.remove('white-bg');
    }

    public increment() {
        this.clickval++;
    }
}
