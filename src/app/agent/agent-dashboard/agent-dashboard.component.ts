import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-agent-dashboard',
  templateUrl: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.scss']
})
export class AgentDashboardComponent {

  constructor(private router: Router, private global: GlobalService) { }

  ngOnInit() {
    this.isAgentLogin()
  }

  isAgentLogin() {
    if (sessionStorage.getItem('isAgentLogin') == 'true') {
      return true
    }
    else {
      return false
    }
  }
}
