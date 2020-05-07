import { trigger, state, style, animate, transition } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu-info',
  templateUrl: './user-menu-info.component.html',
  styleUrls: ['./user-menu-info.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1,
        height: '265px',
        display: 'block',
      })),
      state('closed', style({

        height: '0px',
        opacity: 0,

      })),
      transition('* => closed', [
        animate('0.6s')
      ]),
      transition('* => open', [
        animate('0.6s')
      ]),
    ]),
  ],
})

export class UserMenuInfoComponent implements OnInit {
  @Input()
  isOpenMenu: boolean;
  constructor(private router: Router) {

  }

  ngOnInit() {
  }
  
  navigateToProfile() {
    this.router.navigate(['profile']);
  }

}

