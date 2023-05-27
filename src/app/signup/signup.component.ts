import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../service/global.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers:[MessageService]
})
export class SignupComponent {

  constructor(private fb: FormBuilder, private router: Router, private global: GlobalService,private messageService: MessageService) { }



  signUpForm = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    mobileNumber: ["", Validators.required],
    password: ["", Validators.required],
    confirmPassword: ["", Validators.required],
  })

  agentSignUpForm = this.fb.group({
    fullName: ["", Validators.required],
    email: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    mobileNumber: ["", Validators.required],
    password: ["", Validators.required],
    confirmPassword: ["", Validators.required],
  })


  ngOnInit() {

  }


  userSignup() {
    if (this.signUpForm.valid) {
      this.global.postUnauthenticateData(this.global.basepath + '/user/signUp', this.signUpForm.value).subscribe((res: any) => {
        if (res.success) {
          console.log(res);
          this.messageService.clear()
          this.messageService.add({ severity: 'success', summary: 'User registered successfully' });
          this.signUpForm.reset()
          setTimeout(() => {
          this.router.navigate(['/login'])
          }, 500);
        }
      })
    }
  }

  agentSignup() {
    if (this.agentSignUpForm.valid) {
      this.global.postUnauthenticateData(this.global.basepath + '/agent/register', this.agentSignUpForm.value).subscribe((res: any) => {
        if (res.success) {
          console.log(res);
          this.messageService.clear()
          this.messageService.add({ severity: 'success', summary: 'Agent registered successfully' });
          this.agentSignUpForm.reset()
          setTimeout(() => {
          this.router.navigate(['/agent/agent-login'])
          }, 500);
        }
      })
    }
  }
}
