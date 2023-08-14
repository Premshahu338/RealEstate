import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
  providers: [MessageService]
})
export class PropertiesComponent {
  propertiesArray: any = []
  sellPropertiesArray: any = []
  rentPropertiesArray: any = []
  visible:any
  contactAgentForm: boolean = true
  ContactAgentId: any;
  agentName: any;
  agentArray: any = []
  agentForContact: any = []
  isLogin: boolean = sessionStorage.getItem('isLogin') === 'true';


  activeTab = 'allTab'

  constructor(private fb: FormBuilder, private router: Router, public global: GlobalService, private messageService: MessageService) {
  }

  otpForm = this.fb.group({
    otp1: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
    otp2: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
    otp3: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
    otp4: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
  })


  ngOnInit(): void {
    this.getPropertiesList()
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

  navigateTo(val: any) {
    this.activeTab = val
  }

  getPropertiesList() {
    this.global.getUnAuthenticateData(this.global.basepath + '/agent/getAllProperties').subscribe((res: any) => {
      console.log(res);
      this.propertiesArray = res.propertiesList
      this.propertiesArray.forEach((item: any) => {
        if (item.category == 'To Sell') {
          this.sellPropertiesArray.push(item)
          console.log("sell", this.sellPropertiesArray);
        }
        if (item.category == 'To Rent') {
          this.rentPropertiesArray.push(item)
          console.log("rent", this.rentPropertiesArray);
        }
      });
    })
  }

  getAgentsList() {
    this.global.getUnAuthenticateData(this.global.basepath + '/admin/getAgentsList').subscribe((res: any) => {
      console.log(res);
      this.agentArray = res.agentsList
      this.agentArray.forEach((agent: any) => {
        console.log("ll", agent);
        this.agentForContact = []
        if (agent.agentId === this.ContactAgentId) {
          this.agentForContact.push(agent)
          this.agentName = this.agentForContact[0].fullName
          console.log("agentFor Contact", this.agentForContact);
        }
      });
    })
  }

  viewDetails(item: any) {
    sessionStorage.setItem('agentId', item.agentId)
    sessionStorage.setItem('propertyName', item.propertyName)
    sessionStorage.setItem('price', item.price)
    sessionStorage.setItem('state', item.state)
    sessionStorage.setItem('description', item.description)
    sessionStorage.setItem('category', item.category)
    sessionStorage.setItem('propertyUrl', this.router.url)
    this.router.navigate(['/property-details'])
  }


  contactAgent(item: any) {
    if (this.isLogin) {
      console.log(item);
      this.ContactAgentId = item.agentId
      this.getAgentsList()
      this.contactAgentForm = true
    }
    else{
      this.visible = true;
    }
  }

  submitForm() {
    this.contactAgentForm = false
  }

  addPropertyToFavorites(item:any){
    console.log(item);
    
  }

}
