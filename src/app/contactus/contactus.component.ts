import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss'],
  providers: [MessageService]
})
export class ContactusComponent {
  constructor(private fb: FormBuilder, private router: Router, private global: GlobalService, private messageService: MessageService) { }


  contactUsForm = this.fb.group({
    fullName: ["", Validators.required],
    email: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    mobileNumber: ["", Validators.required],
    message: ["", Validators.required],
  })

  ngOnInit() {

  }

  sample(){
    console.log("working......");
    
  }

  contactUs() {    
    if (this.contactUsForm.valid) {
    this.global.postUnauthenticateData(this.global.basepath + '/user/addContactUs', this.contactUsForm.value).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: 'User contacted successfully' });
        this.contactUsForm.reset()
      }
    })
    }
  }
}
