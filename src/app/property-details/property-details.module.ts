import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyDetailsRoutingModule } from './property-details-routing.module';
import { PropertyDetailsComponent } from './property-details.component';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    PropertyDetailsComponent
  ],
  imports: [
    CommonModule,
    PropertyDetailsRoutingModule,
    GalleriaModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    DialogModule
  ]
})
export class PropertyDetailsModule { }
