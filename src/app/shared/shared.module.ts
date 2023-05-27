import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SubHeaderComponent } from './sub-header/sub-header.component';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    SharedComponent,
    HeaderComponent,
    FooterComponent,
    SubHeaderComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ToastModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SubHeaderComponent
  ]
})
export class SharedModule { }
