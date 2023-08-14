import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PropertiesComponent } from './properties/properties.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SignupComponent } from './signup/signup.component';
import { AgentsComponent } from './agents/agents.component';
import { LoginComponent } from './login/login.component';
import { AgentsProfileComponent } from './agents-profile/agents-profile.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  { path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
  { path: 'home', component: HomeComponent },
  { path: 'properties', component: PropertiesComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'listagents', component: AgentsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profileagents', component: AgentsProfileComponent },
  { path: 'property-details', loadChildren: () => import('./property-details/property-details.module').then(m => m.PropertyDetailsModule) },
  { path: 'agent', loadChildren: () => import('./agent/agent.module').then(m => m.AgentModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top', // Add this option
    }),
  ],  exports: [RouterModule]
})
export class AppRoutingModule { }
