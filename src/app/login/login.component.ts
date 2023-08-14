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
  agentId: any;
  recoverPassForm: boolean = false
  changepassword: boolean = false
  otpFields: boolean = false

  constructor(private fb: FormBuilder, private router: Router, private global: GlobalService, private messageService: MessageService) { }


  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ["", Validators.required],
  })

  otpForm = this.fb.group({
    otp1: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
    otp2: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
    otp3: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
    otp4: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
  })

  ngOnInit() {

  }

  login() {
    if (this.loginForm.valid) {
      this.global.postUnauthenticateData(this.global.basepath + '/user/login', this.loginForm.value).subscribe((res: any) => {
        if (res.success) {
          console.log(res);
          // sessionStorage.setItem('email', this.loginForm.controls['email'].value)
          sessionStorage.setItem('isLogin', 'true')
          sessionStorage.setItem('userId', res.user_id)
          this.agentId = sessionStorage.getItem('agentId')
          sessionStorage.setItem('agentId', this.agentId)
          this.messageService.clear()
          this.messageService.add({ severity: 'success', summary: 'User login successfully' });
          setTimeout(() => {
            this.loginForm.reset()
            this.router.navigate(['/home'])
          }, 1000);
        }
      },(err:any) => {
        this.messageService.clear()
        this.messageService.add({ severity: 'error', summary: 'invalid credential' });
      })

    }
  }

  handleInput(event: any, nextField: number) {
    const input = event.target;
    const inputValue = input.value;

    if (inputValue) {
      if (inputValue.length > 1) {
        input.value = inputValue[inputValue.length - 1];
      }

      if (inputValue.length === 1 && nextField <= 4) {
        const nextInput = document.getElementById(`otp${nextField}`) as HTMLInputElement;
        nextInput.focus();
      }
    }
  }

  sendOtp() {
    this.recoverPassForm = false
    this.otpFields = true
  }

  openForgotModal() {
    this.changepassword = false
    this.recoverPassForm = true
  }

  changePassword() {
    this.recoverPassForm = false
    this.otpFields = false
    this.changepassword = true
  }

}
