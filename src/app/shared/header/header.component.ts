import { Component,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers:[MessageService]
})
export class HeaderComponent {
  
  constructor(private router: Router, private global: GlobalService,private messageService: MessageService) { }
  isNavbarWhite = false;
  isNavbarOpen: boolean = false;

  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isNavbarWhite = window.pageYOffset > 50; // Adjust the value as per your requirement
  }
  
  ngOnInit() {

  }

  toggleNavbar() {
    console.log('kkkk');
    
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  login(){
    if (sessionStorage.getItem('isLogin') == 'true') {
      return true
    }
    else{
      return false
    }
  }
  
  logout(){
    sessionStorage.clear()
    this.messageService.clear()
    this.messageService.add({ severity: 'success', summary: 'User logout successfully!' });
    setTimeout(() => {
      window.location.reload()
    },500);
    this.router.navigate(['/'])
  }


}
