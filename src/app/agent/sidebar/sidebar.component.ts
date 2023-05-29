import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  type: any
  subType: any;
  activeTab: any = 'dashboard'
  name: any
  constructor(private router: Router,private global: GlobalService) { }

  ngOnInit(): void {
  }

  logout() {
    sessionStorage.clear()
    // this.messageService.clear()
    // this.messageService.add({ severity: 'success', summary: 'Logout Succesfull!' });
    setTimeout(() => {
      this.router.navigate(['/']).then(() => window.location.reload())
    }, 500);
  }

  toggleSidebar() {
    console.log(this.global.sidebar);
    this.global.sidebar = !this.global.sidebar
  }


  // checkAdminOrUser() {
  //   if (sessionStorage.getItem('adminLogin') == 'true') {
  //     this.isAdminLogin = true
  //     this.isUserLogin = false
  //   }
  //   if (sessionStorage.getItem('userLogin') == 'true') {
  //     this.isUserLogin = true
  //     this.isAdminLogin = false
  //   }
  // }


  // checkRoute(item: any) {
  //   console.log(item);
  //   if (item == 'admin') {
  //   }
  //   if (item == 'user') {

  //   }
  // }

  navigateTo(val: any) {
    sessionStorage.setItem('activeTab', val)
    this.activeTab = val

    if (val == 'agent-dashboard') {
      this.router.navigate(['/agent/agent-dashboard'])
    }
    else if (val == 'add-property') {
      this.router.navigate(['/agent/add-property'])
    }
    else {
      this.router.navigate(['/' + val])
    }

    // if (this.type == 'manager') {
    //   if (val == 'manager') {
    //     this.router.navigate(['manager'])
    //   } else if (val == 'change-password') {
    //     this.router.navigate(['shared/change-password'])
    //   } else if (val == 'allocate-management' || val == 'late-work-entry') {
    //     this.router.navigate(['manager/' + val])
    //   }
    //   else {
    //     this.router.navigate(['admin/' + val])
    //   }
    // }
    // if (this.type == 'employee') {
    //   if (val == 'employee') {
    //     this.router.navigate(['employee'])
    //   } else if (val == 'change-password') {
    //     this.router.navigate(['shared/change-password'])
    //   } else if (val == 'request-work-entry') {
    //     this.router.navigate(['employee/request-work-entry'])
    //   } else if (val == 'profile') {
    //     this.router.navigate(['employee/profile'])
    //   } else {
    //     this.router.navigate(['admin/' + val])
    //   }
    // }
  }

}
