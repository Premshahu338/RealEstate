import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RealEState';

  constructor(private router: Router) { }


  isLogin() {
    if (this.router.url.includes('signup') || this.router.url.includes('login') || this.router.url.includes('/agent') || this.router.url.includes('/agent/agent-dashboard') || this.router.url.includes('/agent/agent-home') || this.router.url.includes('/agent/add-property')) {
      return false
    }
    else {
      return true;
    }
  }



}
