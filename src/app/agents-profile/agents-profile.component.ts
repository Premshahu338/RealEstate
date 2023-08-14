import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'app-agents-profile',
  templateUrl: './agents-profile.component.html',
  styleUrls: ['./agents-profile.component.scss'],
  providers: [MessageService]
})
export class AgentsProfileComponent {
  agentName: any
  propertiesArray: any = []
  agentId: any
  agentProperties: any = []
  visible: boolean = false
  isLogin: boolean = sessionStorage.getItem('isLogin') === 'true';

  constructor(private fb: FormBuilder, private router: Router, private global: GlobalService, private messageService: MessageService) { }

  ngOnInit() {
    this.agentName = sessionStorage.getItem('fullName')
    this.agentId = sessionStorage.getItem('agentId')
    console.log(sessionStorage.getItem('agentId'));

    console.log(this.agentName);
    this.getPropertiesList()
  }

  getPropertiesList() {
    this.global.getUnAuthenticateData(this.global.basepath + '/agent/getAllProperties').subscribe((res: any) => {
      this.propertiesArray = res.propertiesList
      this.agentProperties = this.propertiesArray.filter((property: any) => property.agentId === this.agentId);
    });
  }


  viewDetails(item: any) {
    sessionStorage.setItem('agentId', item.agentId)
    sessionStorage.setItem('propertyName', item.propertyName)
    sessionStorage.setItem('price', item.price)
    sessionStorage.setItem('state', item.state)
    sessionStorage.setItem('description', item.description)
    sessionStorage.setItem('category', item.category)
    this.router.navigate(['/property-details'])
  }

  addPropertyToFavorites(item:any){

  }

  showDialog() {
    this.visible = true;
  }


  goBack(){
    if (sessionStorage.getItem('property-detailUrl') == '/property-details') {
      this.router.navigate(['/property-details'])
    }
    if (sessionStorage.getItem('agentsUrl') == '/listagents') {
      this.router.navigate(['/listagents'])
    }
  }

}
