import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentloginComponent } from './agentlogin/agentlogin.component';
import { AgentDashboardComponent } from './agent-dashboard/agent-dashboard.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { AgentHomeComponent } from './agent-home/agent-home.component';

const routes: Routes = [
  { path: '', redirectTo: 'agent-login', pathMatch: 'full'},
  { path: 'agent-login', component:AgentloginComponent},
  { path: 'agent-dashboard', component:AgentDashboardComponent},
  { path: 'add-property', component:AddPropertyComponent},
  { path: 'agent-home', component:AgentHomeComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
