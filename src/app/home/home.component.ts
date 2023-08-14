import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'; import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent {

  @ViewChild('otp2Input')
  otp2Input!: ElementRef;
  @ViewChild('otp3Input')
  otp3Input!: ElementRef;
  @ViewChild('otp4Input')
  otp4Input!: ElementRef;

  propertiesArray: any = []
  favoritePropertiesArray: any = []
  visible: boolean = false
  agentArray: any = []
  agentForContact: any = []
  ContactAgentId: any;
  agentName: any;
  contactAgentForm: boolean = true
  favoriteArrayProp: any;
  isLogin: boolean = sessionStorage.getItem('isLogin') === 'true';

  constructor(private fb: FormBuilder, private router: Router, public global: GlobalService, private messageService: MessageService) { }

  otpForm = this.fb.group({
    otp1: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
    otp2: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
    otp3: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
    otp4: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
  })


  ngOnInit(): void {
    this.getPropertiesList()

    // this.showDialog()
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


  submitForm() {
    this.contactAgentForm = false
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


  getPropertiesList() {
    this.global.getUnAuthenticateData(this.global.basepath + '/agent/getAllProperties').subscribe((res: any) => {
      console.log(res);
      this.propertiesArray = res.propertiesList
    })
  }

  viewDetails(item: any) {
    sessionStorage.setItem('agentId', item.agentId)
    sessionStorage.setItem('propertyName', item.propertyName)
    sessionStorage.setItem('price', item.price)
    sessionStorage.setItem('state', item.state)
    sessionStorage.setItem('description', item.description)
    sessionStorage.setItem('category', item.category)
    sessionStorage.setItem('homeUrl', this.router.url)
    this.router.navigate(['/property-details'])
  }

  addPropertyToFavorites(item: any) {
    this.favoriteArrayProp = item
    const exists = this.favoritePropertiesArray.some((item: any) => item.propertyId === this.favoriteArrayProp.propertyId);
    if (exists) {
      this.favoritePropertiesArray = this.favoritePropertiesArray.filter((item: any) => !(item.propertyId === this.favoriteArrayProp.propertyId));
      console.log('Property removed from the array');
      console.log(this.favoritePropertiesArray);

    } else {
      this.favoritePropertiesArray.push(this.favoriteArrayProp);
      console.log('Property added to the array');
      console.log(this.favoritePropertiesArray);
    }
  }
}

// let passData = {
//   userId :    sessionStorage.getItem('userId'),
//   propertyId:item.propertyId
// }

// this.global.postUnauthenticateData(this.global.basepath+'/user/favoriteProperty',passData).subscribe((res:any)=>{
//   console.log(res.favoriteProperties);
// })