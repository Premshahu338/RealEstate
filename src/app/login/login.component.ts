import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../service/global.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {

  constructor(private fb: FormBuilder, private router: Router, private global: GlobalService,private messageService: MessageService) { }


  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ["", Validators.required],
  })

  ngOnInit() {

  }

  login(){
    if (this.loginForm.valid) {    
      this.global.postUnauthenticateData(this.global.basepath + '/user/login', this.loginForm.value).subscribe((res: any) => {
        if (res.success) {
          console.log(res);
          // sessionStorage.setItem('email', this.loginForm.controls['email'].value)
          sessionStorage.setItem('isLogin','true')
          this.messageService.clear()
          this.messageService.add({ severity: 'success', summary: 'User login successfully' });
          setTimeout(() => {
            this.loginForm.reset()
            this.router.navigate(['/home'])
          }, 1000);
        }
      })
    }
  }
}
