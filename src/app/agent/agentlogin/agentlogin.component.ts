import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-agentlogin',
  templateUrl: './agentlogin.component.html',
  styleUrls: ['./agentlogin.component.scss'],
  providers:[MessageService]
})
export class AgentloginComponent {


  constructor(private fb: FormBuilder, private router: Router, private global: GlobalService,private messageService: MessageService) { }

  AgentloginForm = this.fb.group({
    email: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ["", Validators.required],
  })

  Agentlogin(){
    if (this.AgentloginForm.valid) {    
      this.global.postUnauthenticateData(this.global.basepath + '/agent/login', this.AgentloginForm.value).subscribe((res: any) => {
        if (res.success) {
          console.log(res);
          // sessionStorage.setItem('email', this.loginForm.controls['email'].value)
          sessionStorage.setItem('isAgentLogin','true')
          this.messageService.clear()
          this.messageService.add({ severity: 'success', summary: 'Agent login successfully' });
          setTimeout(() => {
            this.AgentloginForm.reset()
            this.router.navigate(['/agent/agent-home'])
          }, 1000);
        }
      })
    }
  }
}
