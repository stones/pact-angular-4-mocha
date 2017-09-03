import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'basic',
  templateUrl: 'basicLayout.template.html',
})

export class BasicLayoutComponent implements OnInit {

  public ngOnInit(): any {
    console.log('init');
  }

  @HostListener('window:resize')
  public onResize() {
    console.log('resize');
  }
}
