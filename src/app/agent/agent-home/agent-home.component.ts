import { Component } from '@angular/core';

@Component({
  selector: 'app-agent-home',
  templateUrl: './agent-home.component.html',
  styleUrls: ['./agent-home.component.scss']
})
export class AgentHomeComponent {

  isAgentLogin() {
    if (sessionStorage.getItem('isAgentLogin') == 'true') {
      return true
    }
    else {
      return false
    }
  }
}
