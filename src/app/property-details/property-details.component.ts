import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../service/global.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-property-details',
    templateUrl: './property-details.component.html',
    styleUrls: ['./property-details.component.scss'],
    providers: [MessageService]
})
export class PropertyDetailsComponent {

    agentArray: any = []
    category: any
    propertyName: any
    price: any
    state: any
    description: any
    agentId: any
    agentData: any = {}
    agentName: any;
    agentEmail: any;
    mobileNumber: any;
    agentIdNew: any;
    agentForContact: any = []
    agentProfileArray: any = []
    // visible:any

    // contactAgentForm: boolean = true
    // favoriteArrayProp: any;
    // isLogin: boolean = sessionStorage.getItem('isLogin') === 'true';
    // ContactAgentId: any;


    constructor(private fb: FormBuilder, private router: Router, public global: GlobalService, private messageService: MessageService) { }

    // otpForm = this.fb.group({
    //     otp1: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
    //     otp2: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
    //     otp3: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
    //     otp4: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
    //   })

    requestInformationForm = this.fb.group({
        fullName: ["", Validators.required],
        email: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        mobileNumber: ["", Validators.required],
        message: ["", Validators.required],
    })

    ngOnInit() {
        this.agentId = sessionStorage.getItem('agentId')
        this.propertyName = sessionStorage.getItem('propertyName')
        this.price = sessionStorage.getItem('price')
        this.state = sessionStorage.getItem('state')
        this.description = sessionStorage.getItem('description')
        this.category = sessionStorage.getItem('category')
        this.getAgentsList()
    }

    getAgentsList() {
        this.global.getUnAuthenticateData(this.global.basepath + '/admin/getAgentsList').subscribe((res: any) => {
            this.agentArray = res.agentsList
            console.log(this.agentArray);

            this.agentArray.forEach((item: any) => {
                if (item.agentId == this.agentId) {
                    this.agentData = item
                    this.agentIdNew = this.agentData.agentId
                    this.agentName = this.agentData.fullName
                    this.agentEmail = this.agentData.email
                    this.mobileNumber = this.agentData.mobileNumber
                    console.log(this.agentIdNew);
                    this.agentForContact = []
                    this.agentForContact.push(item)
                    // this.agentName = this.agentForContact[0].fullName
                    console.log("agentFor Contact", this.agentForContact);
                }
            });
        })
    }

    viewProfile() {
        this.agentProfileArray = []
        this.agentProfileArray = this.agentForContact
        sessionStorage.setItem('fullName', this.agentProfileArray[0].fullName)
        sessionStorage.setItem('agentId', this.agentProfileArray[0].agentId)
        console.log(this.agentProfileArray);
        sessionStorage.setItem("property-detailUrl", this.router.url)
        this.router.navigate(['/profileagents'])
    }

    goToAgentProfile() {
        // this.router.navigate(['/profileagents'])
    }

    requestInformationToAgent() {
        if (this.requestInformationForm.valid) {
            this.global.postUnauthenticateData(this.global.basepath + '/user/requestInformations', this.requestInformationForm.value).subscribe((res: any) => {
                console.log(res);
                if (res.success) {
                    this.messageService.clear()
                    this.messageService.add({ severity: 'success', summary: 'Thank You ! Your Request For Information has been sent successfully to Agent' });
                    this.requestInformationForm.reset()
                }
            })
        }
    }

    // handleInput(event: any, nextField: number) {
    //     const input = event.target;
    //     const inputValue = input.value;

    //     if (inputValue) {
    //         if (inputValue.length > 1) {
    //             input.value = inputValue[inputValue.length - 1];
    //         }

    //         if (inputValue.length === 1 && nextField <= 4) {
    //             const nextInput = document.getElementById(`otp${nextField}`) as HTMLInputElement;
    //             nextInput.focus();
    //         }
    //     }
    // }

    // submitForm() {
    //     this.contactAgentForm = false
    // }

    // contactAgent() {
    //     if (this.isLogin) {
    //     //   console.log(item);
    //     //   this.ContactAgentId = item.agentId
    //       this.getAgentsList()
    //       this.contactAgentForm = true
    //     }
    //     else{
    //       this.visible = true;
    //     }
    //   }

}
