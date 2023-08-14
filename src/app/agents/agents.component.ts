import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss'],
  providers: [MessageService]
})
export class AgentsComponent {
  agentArray: any = []
  constructor(private fb: FormBuilder, private router: Router, private global: GlobalService, private messageService: MessageService) { }

  ngOnInit() {
    this.getAgentsList()
  }

  getAgentsList() {
    this.global.getUnAuthenticateData(this.global.basepath + '/admin/getAgentsList').subscribe((res: any) => {
      console.log(res);
      this.agentArray = res.agentsList
    })
  }

  goToAgentProfile(item: any) {
    sessionStorage.setItem('fullName', item.fullName)
    sessionStorage.setItem('agentId',item.agentId)
    sessionStorage.setItem('agentsUrl',this.router.url)
    this.router.navigate(['/profileagents'])
    console.log(item);
  }

}
