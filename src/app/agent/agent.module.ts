import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { AgentComponent } from './agent.component';
import { AgentloginComponent } from './agentlogin/agentlogin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AgentDashboardComponent } from './agent-dashboard/agent-dashboard.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { AgentHomeComponent } from './agent-home/agent-home.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    AgentComponent,
    AgentloginComponent,
    SidebarComponent,
    AgentDashboardComponent,
    AddPropertyComponent,
    AgentHomeComponent,
  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    DropdownModule
  ],
  exports:[
    SidebarComponent,
  ]
})
export class AgentModule { }
