import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentloginComponent } from './agentlogin/agentlogin.component';

const routes: Routes = [
  { path: '', redirectTo: 'agent-login', pathMatch: 'full'},
  { path: 'agent-login', component:AgentloginComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
