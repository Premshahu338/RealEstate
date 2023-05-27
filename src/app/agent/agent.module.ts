import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { AgentComponent } from './agent.component';
import { AgentloginComponent } from './agentlogin/agentlogin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    AgentComponent,
    AgentloginComponent
  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule
  ]
})
export class AgentModule { }
